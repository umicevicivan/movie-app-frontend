import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiscoverMovies } from '../models/discover-movies.model';
import { TmdbService } from '../services/tmdb.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Movie } from '../models/movie.model';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss'],
})
export class DiscoverPage {
  discoverMovies = new DiscoverMovies();
  movies = [];
  imageBaseUrl = environment.imageBaseUrl;
  page = 1;
 

  @ViewChild(IonInfiniteScroll) infinitescroll: IonInfiniteScroll;

  constructor(
    private tmdbService: TmdbService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadDiscoverMovies(this.page);
  }

  infScroll(infiniteScroll) {
    this.page++;
    this.loadDiscoverMovies(this.page);
    infiniteScroll.target.complete();
  }

  loadDiscoverMovies(page: number) {
    this.tmdbService.getDiscoverMovies(page).subscribe(
      (res) => {
        this.discoverMovies = res;
        this.movies.push.apply(this.movies, this.discoverMovies.results);
      },
      (error) => {
        console.log('Greskica');
      }
    );
  }

}
