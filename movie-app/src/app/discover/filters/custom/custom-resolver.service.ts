import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Resolve } from '@angular/router';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';

@Injectable({
  providedIn: 'root',
})
export class CustomResolverService implements Resolve<DiscoverMovies> {
  constructor(private tmdbService: TmdbService) {}

  resolve(): Observable<DiscoverMovies> {
    return this.tmdbService.loadCustomDiscover(1);
  }
}
