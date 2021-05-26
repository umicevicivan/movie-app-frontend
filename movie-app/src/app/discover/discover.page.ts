import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TmdbService } from '../services/tmdb.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-discover',
    templateUrl: 'discover.page.html',
    styleUrls: ['discover.page.scss'],
})
export class DiscoverPage {
    private movies: BehaviorSubject<Movie[]> = new BehaviorSubject([]);

    movies$: Observable<Movie[]> = this.movies.asObservable();

    imageBaseUrl = environment.imageBaseUrl;
    page = 1;


    @ViewChild(IonInfiniteScroll) infinitescroll: IonInfiniteScroll;

    constructor(
        private tmdbService: TmdbService,
        private modalCtrl: ModalController
    ) {
    }

    ngOnInit() {
        this.loadDiscoverMovies(this.page);
    }

    ngOnDestroy(): void {
        this.movies.complete();
    }

    infScroll(infiniteScroll) {
        this.page++;
        this.loadDiscoverMovies(this.page);
        infiniteScroll.target.complete();
    }

    loadDiscoverMovies(page: number) {
        this.tmdbService.getDiscoverMovies(page).subscribe(
            (res) => {
                let movies = this.movies.getValue();
                movies.push.apply(movies, res.results);
                this.movies.next(movies);
            },
            (error) => {
                console.log('Greskica');
            }
        );
    }

}
