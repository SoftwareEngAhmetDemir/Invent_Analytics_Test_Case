import axios from 'axios';

// http://www.omdbapi.com/?apikey=48a34b9&type=movie&s=Pokemon&page=24
const API_KEY = process.env.REACT_APP_API_KEY as string;
const BASE_URL = process.env.REACT_APP_BASE_URL as string;

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
  Released:string;
}

export const fetchMovies = async (
  search: string,
  type: string | null,
  year: string | null,
  page: number
): Promise<MovieResponse> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apiKey: API_KEY,
      s: search,
      type,
      y: year,
      page,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apiKey: API_KEY,
      i: id,
    },
  });
  return response.data;
};
