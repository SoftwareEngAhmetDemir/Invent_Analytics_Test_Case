export interface Iseaching {
  title: string | null;
  type: string | null;
  year: string | null;
  page: number;
}
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Released: string;
}

export interface MovieState {
  movies: Movie[];
  movieDetails: MovieDetails | null;
  totalResults: number;
  loading: boolean;
  searching: {
    title: string | null;
    year: string | null;
    type: string | null;
    page: number;
  };
  loadingDetails: boolean;
}
