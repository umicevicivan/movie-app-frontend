import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/core/api/movies/tmdb.service';
import { Movie } from '../api/movies/movie';

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<Movie> {
    constructor(private tmdbService: TmdbService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
        return this.tmdbService.getMovieDetails(route.paramMap.get('id'));
    }
}
