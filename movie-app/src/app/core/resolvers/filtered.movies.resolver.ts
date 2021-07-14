import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TMDBMoviesWrapper } from 'src/app/core/api/movies/movie';
import { TmdbService } from 'src/app/core/api/movies/tmdb.service';

@Injectable({
    providedIn: 'root'
})
export class FilteredMoviesResolver implements Resolve<TMDBMoviesWrapper> {
    constructor(private tmdbService: TmdbService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TMDBMoviesWrapper> {
        return this.tmdbService.loadCustomDiscover(1);
    }
}
