import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieCredits, TMDBMoviesWrapper } from './movie';
import { environment } from 'src/environments/environment';

export class MovieFilters {
    genres: string[];
    dateFrom: Date;
    dateTo: Date;
    sortBy: string;
    descAsc: string;
}

@Injectable({
    providedIn: 'root',
})
export class TmdbService {
    baseUrl: 'https://api.themoviedb.org/3';
    page = 1;
    private _customDiscover = new TMDBMoviesWrapper();
    private currentYear = new Date().getFullYear();
    formatedURLStart = '';
    formatedURLEnd = '';

    public get customDiscover() {
        return this._customDiscover;
    }

    constructor(public http: HttpClient) {
    }

    find(page: number): Observable<TMDBMoviesWrapper> {
        return this.http.get<TMDBMoviesWrapper>(
            `${environment.baseTMDBUrl}/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${this.currentYear}`
        );
    }

    getMovieDetails(id: string): Observable<Movie> {
        return this.http.get<Movie>(
            `${environment.baseTMDBUrl}/movie/${id}`
        );
    }

    getMovieCredits(id: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(
            `${environment.baseTMDBUrl}/movie/${id}/credits?language=en-US`
        );
    }

    getSimilarMovies(id: number): Observable<TMDBMoviesWrapper> {
        return this.http.get<TMDBMoviesWrapper>(
            `${environment.baseTMDBUrl}/movie/${id}/similar?language=en-US&page=1`
        );
    }

    getSearchMovies(searchTerm: string): Observable<TMDBMoviesWrapper> {
        return this.http.get<TMDBMoviesWrapper>(
            `${environment.baseTMDBUrl}/search/movie?language=en-US&query=${searchTerm}&page=1&include_adult=false`
        );
    }

    createCustomSearchURL(filters: MovieFilters) {
        // ova logika je retardirana ali mora ovako jer im se retardirano zovu paramteri
        let formatedDateTo = '';
        let formatedDateFrom = '';
        let formatedGenres = '';

        // Ovo ce doci uvek jer imamo defaultnu vrednost
        const formatedSortBy = '&sort_by=' + filters.sortBy + '.' + filters.descAsc;


        // TODO koristi moment a ne ovaj usrani pipe
        if (filters.dateFrom != null) {
            const dateFrom = new Date(filters.dateFrom);
            formatedDateFrom =
                '&primary_release_date.gte=' +
                dateFrom.getUTCFullYear().toString() +
                '-01-01';
        }

        if (filters.dateTo != null) {
            const dateTo = new Date(filters.dateTo);
            formatedDateTo =
                '&primary_release_date.lte=' +
                dateTo.getUTCFullYear().toString() +
                '-12-31';
        }

        if (filters.genres != null && filters.genres.length > 0) {
            const a = filters.genres;
            const b = a.join('%2c');
            formatedGenres = '&with_genres=' + b;
        }
        this.formatedURLStart =
            `${environment.baseTMDBUrl}/discover/movie?&language=en-US${formatedSortBy}&include_adult=false&include_video=false&page=`;

        this.formatedURLEnd = formatedDateFrom +
            formatedDateTo +
            '&vote_count.gte=200' +
            formatedGenres;
    }

    loadCustomDiscover(page: number): Observable<TMDBMoviesWrapper> {
        this.page = page;
        return this.http.get<TMDBMoviesWrapper>(this.formatedURLStart + page + this.formatedURLEnd);
    }
}
