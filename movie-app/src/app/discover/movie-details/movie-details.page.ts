import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { Movie } from 'src/app/models/movie.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';
import { ScrollDetail } from '@ionic/core';
import { IMDBMovie } from 'src/app/models/imdb-movie.model';
import { Credits } from 'src/app/models/credits.model';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ListModel } from '../../models/list.model';
import { ApplicationService } from '../../services/application.service';
import { MovieListWrapperModal } from '../../models/movie-list-wrapper.modal';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.page.html',
    styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit, OnDestroy {
    private movie: BehaviorSubject<Movie> = new BehaviorSubject(null);
    private imdbMovie: BehaviorSubject<IMDBMovie> = new BehaviorSubject(null);
    private credits: BehaviorSubject<Credits> = new BehaviorSubject(null);
    private similarMovies: BehaviorSubject<DiscoverMovies> = new BehaviorSubject(null);
    private lists: BehaviorSubject<ListModel[]> = new BehaviorSubject([]);
    private addedLists: BehaviorSubject<ListModel[]> = new BehaviorSubject([]);

    lists$: Observable<ListModel[]> = this.lists.asObservable();
    addedLists$: Observable<ListModel[]> = this.addedLists.asObservable();
    movie$: Observable<Movie> = this.movie.asObservable();
    imdbMovie$: Observable<IMDBMovie> = this.imdbMovie.asObservable();
    credits$: Observable<Credits> = this.credits.asObservable();
    similarMovies$: Observable<DiscoverMovies> = this.similarMovies.asObservable();

    isDataAvailable = true;
    imageBaseUrl = environment.imageBaseUrl;
    releaseDate: Date;
    showToolbarTitle = false;
    runtimeH: number;
    runtimeMin: number;
    info = true;
    cast = false;
    similar = false;
    inputs = [];

    constructor(
        private tmdbService: TmdbService,
        private route: ActivatedRoute,
        private loadingCtrl: LoadingController, private tts: TextToSpeech,
        private applicationService: ApplicationService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
        this.movie.next(this.route.snapshot.data.movie);
        this.getIMDBStats(this.movie.getValue().imdb_id);
        this.calculateRunTimeandReleaseDate();
        this.createInputs();
        this.fetchAddedLists(this.movie.getValue().id);
    }

    ngOnDestroy(): void {
        this.movie.complete();
        this.imdbMovie.complete();
    }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.showToolbarTitle = scrollTop >= 225;
        }
    }

    getIMDBStats(imdbid: string) {
        this.tmdbService.getIMDBMovie(imdbid).subscribe((res) => {
            this.imdbMovie.next(res);
        });
    }

    calculateRunTimeandReleaseDate() {
        this.releaseDate = new Date(this.movie.getValue().release_date);
        this.runtimeMin = this.movie.getValue().runtime % 60;
        this.runtimeH = (this.movie.getValue().runtime - this.runtimeMin) / 60;
    }

    segmentChanged(ev: any) {
        if (ev.detail.value === 'info') {
            this.info = true;
            this.cast = false;
            this.similar = false;
        }
        if (ev.detail.value === 'cast') {
            if (this.credits.getValue() == null) {
                this.loadingCtrl
                    .create({message: 'Loading cast...'})
                    .then((loadingEl) => {
                        loadingEl.present();
                        this.loadCredits(this.movie.getValue().id).then((x) => {
                            if (x) {
                                this.info = false;
                                this.cast = true;
                                this.similar = false;
                                loadingEl.dismiss();
                            }
                        });
                    });
            } else {
                this.info = false;
                this.cast = true;
                this.similar = false;
            }
        }
        if (ev.detail.value === 'similar') {
            if (this.similarMovies.getValue() == null) {
                this.loadingCtrl
                    .create({message: 'Loading similar...'})
                    .then((loadingEl) => {
                        loadingEl.present();
                        this.loadSimilar(this.movie.getValue().id).then((x) => {
                            if (x) {
                                this.info = false;
                                this.cast = false;
                                this.similar = true;
                                loadingEl.dismiss();
                            }
                        });
                    });
            } else {
                this.info = false;
                this.cast = false;
                this.similar = true;
            }
        }
    }

    loadCredits(id: number) {
        return new Promise((resolve) => {
            this.tmdbService.getMovieCredits(id).subscribe((res) => {
                this.credits.next(res);
                resolve(true);
            });
        });
    }

    loadSimilar(id: number) {
        return new Promise((resolve) => {
            this.tmdbService.getSimilarMovies(id).subscribe((res) => {
                this.similarMovies.next(res);
                resolve(true);
            });
        });
    }

    textToSpeech(overview: string): void {
        this.tts.speak(overview)
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
    }

    addMovieToList(apiId: number): void {
        this.presentAlertCheckbox(apiId);
    }

    private createInputs() {
        this.applicationService.fetchLists().subscribe(res => {
            this.lists.next(res);
            const added = this.addedLists.getValue();
            this.lists.getValue().forEach(item => {
                let checked = false;
                if (added.some(list => list.name === item.name)) {
                    checked = true;
                }
                this.inputs.push(
                    {
                        type: 'checkbox',
                        label: item.name,
                        value: item.name,
                        checked,
                    }
                );
            });
        });
    }

    private fetchAddedLists(apiId: number): void {
        this.applicationService.fetchAddedLists(apiId).subscribe(res => {
            this.addedLists.next(res);
        });
    }

    async presentAlertCheckbox(apiId: number) {
        const alert = await this.alertController.create({
            header: 'Chose movie list',
            inputs: this.inputs,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        data.forEach(listName => {
                            // Not smart logic, implement so multiple lists can be send at the same time
                            // implement remove
                            if (this.addedLists.getValue().some(list => list.name === listName)) {
                                return;
                            }
                            const wrapper: MovieListWrapperModal = new MovieListWrapperModal();
                            wrapper.movieApiKey = apiId;
                            wrapper.listName = listName;
                            console.log(wrapper);
                            this.applicationService.addMovie(wrapper).subscribe(res => {
                                alert.dismiss(null);
                            });
                        });
                    }
                }
            ]
        });
        await alert.present();
    }
}
