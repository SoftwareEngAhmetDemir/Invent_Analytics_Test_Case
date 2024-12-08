import axios from 'axios';

// http://www.omdbapi.com/?apikey=48a34b9&type=movie&s=Pokemon&page=24
const API_KEY = '48a34b9'; // Replace with your OMDb API key
const BASE_URL = 'https://www.omdbapi.com/';

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
