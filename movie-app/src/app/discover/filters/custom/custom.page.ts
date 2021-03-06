import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TmdbService } from 'src/app/core/api/movies/tmdb.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Movie, TMDBMoviesWrapper } from 'src/app/core/api/movies/movie';

@Component({
    selector: 'app-custom',
    templateUrl: './custom.page.html',
    styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {

    private movies: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
    private response: BehaviorSubject<TMDBMoviesWrapper> = new BehaviorSubject(null);

    movies$: Observable<Movie[]> = this.movies.asObservable();
    response$: Observable<TMDBMoviesWrapper> = this.response.asObservable();
    moviesEmpty$: Observable<boolean> = this.movies$.pipe(map(movies => !movies || movies.length === 0));

    imageBaseUrl = environment.imageBaseUrl;
    page = 1;

    constructor(
        private tmdbService: TmdbService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.movies.next(this.route.snapshot.data.filteredMovies.results);
        this.response.next(this.route.snapshot.data.filteredMovies);
    }

    ngOnDestroy(): void {
        this.movies.complete();
    }

    infScroll(infiniteScroll) {
        if (this.page >= this.response.getValue().total_pages) {
            infiniteScroll.target.complete();
            return;
        }
        this.page++;
        this.loadMore(this.page, infiniteScroll);
    }

    loadMore(page: number, infiniteScroll: any) {
        this.tmdbService.loadCustomDiscover(page).subscribe(res => {
            let movies = this.movies.getValue();
            movies.push.apply(movies, res.results);
            this.movies.next(movies);
            infiniteScroll.target.complete();
        });
    }
}
