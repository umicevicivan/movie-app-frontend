import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { Movie } from 'src/app/models/movie.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';
import { ScrollDetail } from '@ionic/core';
import { IMDBMovie } from 'src/app/models/imdb-movie.model';
import { Credits } from 'src/app/models/credits.model';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movie: BehaviorSubject<Movie> = new BehaviorSubject(null);
  private imdbMovie: BehaviorSubject<IMDBMovie> = new BehaviorSubject(null);
  private credits: BehaviorSubject<Credits> = new BehaviorSubject(null);
  private similarMovies: BehaviorSubject<DiscoverMovies> = new BehaviorSubject(null);

  movie$: Observable<Movie> = this.movie.asObservable();
  imdbMovie$: Observable<IMDBMovie> = this.imdbMovie.asObservable();
  credits$: Observable<Credits> = this.credits.asObservable();
  similarMovies$: Observable<DiscoverMovies> = this.similarMovies.asObservable();

  isDataAvailable: boolean = true;
  imageBaseUrl = environment.imageBaseUrl;
  releaseDate: Date;
  showToolbarTitle = false;
  runtimeH: number;
  runtimeMin: number;
  info = true;
  cast = false;
  similar = false;

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.movie.next(this.route.snapshot.data.movie);
    this.getIMDBStats(this.movie.getValue().imdb_id);
    this.calculateRunTimeandReleaseDate();
  }

  ngOnDestroy(): void {
    this.movie.complete();
    this.imdbMovie.complete();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbarTitle = scrollTop >= 225;
    }
  }

  getIMDBStats(imdbid: string) {
    this.tmdbService.getIMDBMovie(imdbid).subscribe((res) => {
      this.imdbMovie.next(res);
    });
  }

  calculateRunTimeandReleaseDate() {
    this.releaseDate = new Date(this.movie.getValue().release_date);
    this.runtimeMin = this.movie.getValue().runtime % 60;
    this.runtimeH = (this.movie.getValue().runtime - this.runtimeMin) / 60;
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'info') {
      this.info = true;
      this.cast = false;
      this.similar = false;
    }
    if (ev.detail.value === 'cast') {
      if (this.credits.getValue() == null) {
        this.loadingCtrl
          .create({ message: 'Loading cast...' })
          .then((loadingEl) => {
            loadingEl.present();
            this.loadCredits(this.movie.getValue().id).then((x) => {
              if (x) {
                this.info = false;
                this.cast = true;
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
    if (ev.detail.value === 'similar') {
      if (this.similarMovies.getValue() == null) {
        this.loadingCtrl
          .create({ message: 'Loading similar...' })
          .then((loadingEl) => {
            loadingEl.present();
            this.loadSimilar(this.movie.getValue().id).then((x) => {
              if (x) {
                this.info = false;
                this.cast = false;
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
      this.tmdbService.getMovieCredits(id).subscribe((res) => {
        this.credits.next(res);
        resolve(true);
      });
    });
  }

  loadSimilar(id: number) {
    return new Promise((resolve) => {
      this.tmdbService.getSimilarMovies(id).subscribe((res) => {
        this.similarMovies.next(res);
        resolve(true);
      });
    });
  }
}