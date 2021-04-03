import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DiscoverMovies } from '../models/discover-movies.model';
import { Filters } from '../models/filters.model';
import { DateFormaterPipe } from '../helpers/date-formater.pipe';
import { Movie } from '../models/movie.model';
import { IMDBMovie } from '../models/imdb-movie.model';
import { Credits } from '../models/credits.model';
import { environment } from 'src/environments/environment';

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

  constructor(
    public http: HttpClient,
    private dateFormater: DateFormaterPipe,    
  ) {}

  getIMDBMovie(id: string): Observable<IMDBMovie> {
    return this.http.get<IMDBMovie>(
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

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${environment.baseTMDBUrl}/movie/${id}${environment.tmdbAPIKey}`
    );
  }

  getMovieCredits(id: number): Observable<Credits> {
    return this.http.get<Credits>(
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
