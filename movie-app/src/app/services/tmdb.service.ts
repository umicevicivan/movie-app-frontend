import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DiscoverMovies } from '../models/discover-movies.model';
import { IMovie } from '../interfaces/movie.interface';
import { IImdbMovie } from '../interfaces/imdb-movie.interface';
import { ICredits } from '../interfaces/credits.interface';
import { Filters } from '../models/filters.model';
import { DateFormaterPipe } from '../helpers/date-formater.pipe';
import {
  LoadingController,
  NavController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  baseUrl: 'https://api.themoviedb.org/3';
  page = 1;
  private _customDiscover = new DiscoverMovies();
  formatedURLStart = "";
  formatedURLEnd = "";

  public get customDiscover(){
    return this._customDiscover;
  }

//   public set customDiscover(a: DiscoverMovies) {
//     this._customDiscover = a;
// }

  constructor(
    public http: HttpClient,
    private dateFormater: DateFormaterPipe,    
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  getIMDBMovie(id: string): Observable<IImdbMovie> {
    return this.http.get<IImdbMovie>(
      'http://www.omdbapi.com/?i=' + id + '&apikey=84f4dc28'
    );
  }

  getDiscoverMovies(page: number): Observable<DiscoverMovies> {
    return this.http.get<DiscoverMovies>(
      'https://api.themoviedb.org/3/discover/movie?api_key=b0f050761122a02ff898ef11aefc59c8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +
        page +
        '&primary_release_year=2020'
    );
  }

  getMovieDetails(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '?api_key=b0f050761122a02ff898ef11aefc59c8'
    );
  }

  getMovieCredits(id: number): Observable<ICredits> {
    return this.http.get<ICredits>(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '/credits?api_key=b0f050761122a02ff898ef11aefc59c8&language=en-US'
    );
  }

  getSimilarMovies(id: number): Observable<DiscoverMovies> {
    return this.http.get<DiscoverMovies>(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '/similar?api_key=b0f050761122a02ff898ef11aefc59c8&language=en-US&page=1'
    );
  }

  getsearchMovies(searchTerm: string): Observable<DiscoverMovies> {
    return this.http.get<DiscoverMovies>(
      'https://api.themoviedb.org/3/search/movie?api_key=b0f050761122a02ff898ef11aefc59c8&language=en-US&query=' +
        searchTerm +
        '&page=1&include_adult=false'
    );
  }

  createCustomSearchURL(filters: Filters) {
    var formatedDateTo = '';
    var formatedDateFrom = '';
    var formatedGenres = '';

    //Ovo ce doci uvek jer imamo defaultnu vrednost
    var formatedSortBy = '&sort_by=' + filters.sortBy + '.' + filters.descAsc;

    if (filters.dateFrom != null) {
      let dateFrom = new Date(filters.dateFrom);
      formatedDateFrom =
        '&primary_release_date.gte=' +
        this.dateFormater.transform(dateFrom) +
        '-01-01';
    }

    if (filters.dateTo != null) {
      let dateTo = new Date(filters.dateTo);
      formatedDateTo =
        '&primary_release_date.lte=' +
        this.dateFormater.transform(dateTo) +
        '-12-31';
    }

    if (filters.genres != null && filters.genres.length > 0) {
      var a = filters.genres;
      var b = a.join('%2c');
      formatedGenres = '&with_genres=' + b;
    }
    this.formatedURLStart =
      'https://api.themoviedb.org/3/discover/movie?api_key=b0f050761122a02ff898ef11aefc59c8&language=en-US' +
      formatedSortBy +
      '&include_adult=false&include_video=false&page='; 
    
    this.formatedURLEnd = formatedDateFrom +
      formatedDateTo +
      "&vote_count.gte=200" +
      formatedGenres;
  }

  loadCustomDiscover(page: number): Observable<DiscoverMovies>{
    this.page = page;
    return this.http.get<DiscoverMovies>(this.formatedURLStart + page + this.formatedURLEnd);
  }
}
