import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieListsService } from '../api/movie-lists/movie-lists.service';
import { MovieList } from '../api/movies/movie';

@Injectable({
    providedIn: 'root'
})
export class ListResolver implements Resolve<MovieList> {
    constructor(private applicationService: MovieListsService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieList> {
        return this.applicationService.findByName(route.paramMap.get('name'));
    }
}
