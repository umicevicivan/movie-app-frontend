import { Movie } from './movie.model';

export class DiscoverMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;

  constructor(p?: any) {
    if (p == null) {
      return;
    }
    this.page = p.page;
    this.results = new Array(p.results);
    this.total_pages = p.total_pages;
    this.total_results = p.total_results;
  }
}
