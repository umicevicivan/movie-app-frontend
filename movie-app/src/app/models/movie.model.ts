import { Genre } from "./genre.model";
import { ProductionCompany } from "../models/production-companies.model";
import { ProductionCountry } from "../models/production-countrie.model";

export class Movie{
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
}
