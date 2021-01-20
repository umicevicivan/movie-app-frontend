import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';
import { Movie } from 'src/app/models/movie.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {
  movies: Movie[];
  imageBaseUrl = environment.imageBaseUrl;
  page = 1;
  discoverMovies = new DiscoverMovies();

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCustom();
  }

  loadCustom() {
    return new Promise((resolve) => {
      this.route.data.subscribe((data: { result: DiscoverMovies }) => {
        this.discoverMovies = data.result;
        this.movies = data.result.results;
        resolve(true);
      });
    });
  }

  infScroll(infiniteScroll){
    this.page++;
    this.getMoreMovies(this.page);
    infiniteScroll.target.complete();
  }

  getMoreMovies(page: number) {
    this.tmdbService.loadCustomDiscover(page).subscribe(
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
