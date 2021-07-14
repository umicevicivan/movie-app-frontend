export class Movie {
    id: number;
    apiId: number;
    poster_path: string;
    posterUrl: string;
    original_title: string;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    imdb_id: string;
    genres: MovieGenre[];
    budget: number;
    original_language: string;
    revenue: number;
    status: string;
    tagline: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
}

export class TMDBMoviesWrapper {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export class MovieCredits {
    id: number;
    cast: MoviePerson[];
    crew: MoviePerson[];
}

export class MovieGenre {
    id: number;
    name: string;
}

export class IMDBMovie {
    imdbVotes: string;
    imdbRating: string;
    Director: string;
}

export class MoviePerson {
    id: number;
    gender: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    job: string;
    character: string;
}

export class ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
}

export class ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export class MovieList {
    name: string;
    movies: Movie[];
}

export class MovieListWrapperModal {
    listName: string;
    movieApiKey: number;
}



