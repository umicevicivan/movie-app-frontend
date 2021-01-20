import { Genre } from "./genre.model";
import { ProductionCompany } from "../models/production-companies.model";
import { ProductionCountry } from "../models/production-countrie.model";
import { IMovie } from "../interfaces/movie.interface";

export class Movie implements IMovie{
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  imdb_id: string;
  genres: Genre[];
  budget: number;
  original_language: string;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];

  constructor(m: any) {
    this.id = m.id;
    this.title = m.title;
    this.poster_path = m.poster_path;
    this.original_title = m.original_title;
    this.title = m.title;
    this.release_date = m.release_date;
    this.backdrop_path = m.backdrop_path;
    this.overview = m.overview;
    this.runtime = m.runtime;
    this.vote_average = m.vote_average;
    this.vote_count = m.vote_count;
    this.imdb_id = m.imdb_id;
    this.genres = m.genres;
    this.budget = m.budget;
    this.original_language = m.original_language;
    this.revenue = m.revenue;
    this.status = m.status;
    this.tagline = m.tagline;
    this.production_companies = m.production_companies;
    this.production_countries = m.production_countries;
  }
}
