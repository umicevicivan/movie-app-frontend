import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { TmdbService } from 'src/app/core/api/movies/tmdb.service';
import { environment } from 'src/environments/environment';
import { ScrollDetail } from '@ionic/core';
import { IMDBMovie, Movie, MovieCredits, MovieList, MovieListWrapperModal, TMDBMoviesWrapper } from 'src/app/core/api/movies/movie';
import { BehaviorSubject, Observable } from 'rxjs';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { MovieListsService } from '../../core/api/movie-lists/movie-lists.service';
import { NotifyService } from '../../core/util/notify.service';
import { ImdbService } from '../../core/api/movies/imdb.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.page.html',
    styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit, OnDestroy {
    private movie: BehaviorSubject<Movie> = new BehaviorSubject(null);
    private imdbMovie: BehaviorSubject<IMDBMovie> = new BehaviorSubject(null);
    private credits: BehaviorSubject<MovieCredits> = new BehaviorSubject(null);
    private similarMovies: BehaviorSubject<TMDBMoviesWrapper> = new BehaviorSubject(null);
    private lists: BehaviorSubject<MovieList[]> = new BehaviorSubject([]);
    private addedLists: BehaviorSubject<MovieList[]> = new BehaviorSubject([]);

    lists$: Observable<MovieList[]> = this.lists.asObservable();
    addedLists$: Observable<MovieList[]> = this.addedLists.asObservable();
    movie$: Observable<Movie> = this.movie.asObservable();
    imdbMovie$: Observable<IMDBMovie> = this.imdbMovie.asObservable();
    credits$: Observable<MovieCredits> = this.credits.asObservable();
    similarMovies$: Observable<TMDBMoviesWrapper> = this.similarMovies.asObservable();

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
        private imdbService: ImdbService,
        private route: ActivatedRoute,
        private loadingCtrl: LoadingController, private tts: TextToSpeech,
        private applicationService: MovieListsService,
        private alertController: AlertController,
        private notifyService: NotifyService,
    ) {
    }

    ngOnInit() {
        this.movie.next(this.route.snapshot.data.movie);
        this.getIMDBStats(this.movie.getValue().imdb_id);
        this.calculateRunTimeandReleaseDate();
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
        this.imdbService.findById(imdbid).subscribe((res) => {
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

    private createInputs() {
        const added = this.addedLists.getValue();
        this.inputs = [];
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
    }

    addMovieToList(apiId: number): void {
        this.applicationService.find().subscribe(res => {
            if (res && res.length === 0) {
                this.notifyService.alert('No movie lists!', 'Please create at least one movie list.', 'Click OK to continue');
                return;
            }
            this.lists.next(res);
            this.applicationService.fetchAddedLists(apiId).subscribe(lists => {
                this.addedLists.next(lists);
                this.createInputs();
                this.presentAlertCheckbox(apiId);
            });
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
                            this.applicationService.addMovie(wrapper).subscribe(res => {
                                this.notifyService.success(`Movie successfully added to list ${listName}!`);
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
