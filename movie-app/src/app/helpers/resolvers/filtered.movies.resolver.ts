import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';
import { TmdbService } from 'src/app/services/tmdb.service';

@Injectable({
    providedIn: 'root'
})
export class FilteredMoviesResolver implements Resolve<DiscoverMovies> {
    constructor(private tmdbService: TmdbService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiscoverMovies> {
        return this.tmdbService.loadCustomDiscover(1);
    }
}
