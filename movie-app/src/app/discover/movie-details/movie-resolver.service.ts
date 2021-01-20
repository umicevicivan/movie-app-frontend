import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IMovie } from 'src/app/interfaces/movie.interface';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class MovieResolverService implements Resolve<IMovie> {
  constructor(private tmdbService: TmdbService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IMovie>{
    return this.tmdbService.getMovieDetails(route.paramMap.get('id'));
  }
}
