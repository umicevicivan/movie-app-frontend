import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Movie } from "src/app/models/movie.model";
import { TmdbService } from "src/app/services/tmdb.service";

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<Movie>{
    constructor(private tmdbService: TmdbService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie>{
        return this.tmdbService.getMovieDetails(route.paramMap.get('id'));
    }
}