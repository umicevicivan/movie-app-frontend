import { IImdbMovie } from "../interfaces/imdb-movie.interface";

export class IMDBMovie implements IImdbMovie{
  imdbVotes: string;
  imdbRating: string;
  Director: string;
}
