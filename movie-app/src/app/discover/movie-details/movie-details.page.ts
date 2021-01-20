import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  NavController,
} from '@ionic/angular';

import { IMovie } from 'src/app/interfaces/movie.interface';
import { Movie } from 'src/app/models/movie.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';
import { ScrollDetail } from '@ionic/core';
import { IMDBMovie } from 'src/app/models/imdb-movie.model';
import { Credits } from 'src/app/models/credits.model';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  isDataAvailable: boolean = true;
  movie: Movie;
  imageBaseUrl = environment.imageBaseUrl;
  releaseDate: Date;
  showToolbar = false;
  runtimeH: number;
  runtimeMin: number;
  imdbMovie = new IMDBMovie();
  info = true;
  cast = false;
  // crew = false;
  similar = false;
  credits: Credits;
  similarMovies: DiscoverMovies;


  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.imdbMovie.imdbRating = '1';
    this.imdbMovie.imdbVotes = '1';
    this.imdbMovie.Director = 'aa';
  }

  ngOnInit() {
    this.loadMovie();
    this.getIMDBStats(this.movie.imdb_id);
    this.calculateRunTimeandReleaseDate();
  }

  loadMovie() {
    return new Promise((resolve) => {
      this.route.data.subscribe((data: { imovie: IMovie }) => {
        this.movie = new Movie(data.imovie);
        resolve(true);
      });
    });
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  getIMDBStats(imdbid: string) {
    this.tmdbService.getIMDBMovie(imdbid).subscribe((data) => {
      this.imdbMovie = new IMDBMovie();
      this.imdbMovie.imdbRating = data.imdbRating;
      this.imdbMovie.imdbVotes = data.imdbVotes;
      this.imdbMovie.Director = data.Director;
    });
  }

  calculateRunTimeandReleaseDate() {
    this.releaseDate = new Date(this.movie.release_date);
    this.runtimeMin = this.movie.runtime % 60;
    this.runtimeH = (this.movie.runtime - this.runtimeMin) / 60;
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'info') {
      this.info = true;
      this.cast = false;
      // this.crew = false;
      this.similar = false;
    }
    if (ev.detail.value === 'cast') {
      // this.isLoading = true;
      // this.loadCredits(this.movie.id);
      // this.loadingCtrl
      //   .create({ message: 'Loading cast...' })
      //   .then((loadingEl) => {
      //     loadingEl.present();
      //     setTimeout(() => {
      //       this.isLoading = false;
      //       loadingEl.dismiss();
      //       this.info = false;
      //       this.cast = true;
      //       this.similar = false;
      //     }, 800);
      //   });

      if (this.credits == undefined) {
        this.loadingCtrl
          .create({ message: 'Loading cast...' })
          .then((loadingEl) => {
            loadingEl.present();
            this.loadCredits(this.movie.id).then((x) => {
              if (x) {
                this.info = false;
                this.cast = true;
                // this.crew = false;
                this.similar = false;
                loadingEl.dismiss();
              }
            });
          });
      } else {
        this.info = false;
        this.cast = true;
        this.similar = false;
      }
    }
    // if (ev.detail.value === 'crew') {
    //   this.info = false;
    //   this.cast = false;
    //   this.crew = true;
    //   this.similar = false;
    // }
    if (ev.detail.value === 'similar') {
      // this.isLoading = true;
      // this.loadRecommended(this.movie.id);
      // this.loadingCtrl
      //   .create({ message: 'Loading similar...' })
      //   .then((loadingEl) => {
      //     loadingEl.present();
      //     setTimeout(() => {
      //       this.isLoading = false;
      //       loadingEl.dismiss();
      //       this.info = false;
      //       this.cast = false;
      //       this.similar = true;
      //     }, 800);
      //   });
      if (this.similarMovies == undefined) {
        this.loadingCtrl
          .create({ message: 'Loading similar...' })
          .then((loadingEl) => {
            loadingEl.present();
            this.loadSimilar(this.movie.id).then((x) => {
              if (x) {
                this.info = false;
                this.cast = false;
                // this.crew = false;
                this.similar = true;
                loadingEl.dismiss();
              }
            });
          });
      } else {
        this.info = false;
        this.cast = false;
        this.similar = true;
      }
    }
  }

  loadCredits(id: number) {
    return new Promise((resolve) => {
      this.tmdbService.getMovieCredits(id).subscribe((data) => {
        this.credits = new Credits(data);
        resolve(true);
      });
    });
  }

  loadSimilar(id: number) {
    return new Promise((resolve) => {
      this.tmdbService.getSimilarMovies(id).subscribe((data) => {
        this.similarMovies = data;
        resolve(true);
      });
    });
  }
}
