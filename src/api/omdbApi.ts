import axiosInstance from "../util/axiosInstance";

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

export const fetchMovies = async (
  search: string,
  type: string | null,
  year: string | null,
  page: number
): Promise<MovieResponse> => {
  const response = await axiosInstance.get("", {
    params: {
      s: search,
      type,
      y: year,
      page
    }
  });
  return response.data;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await axiosInstance.get("", {
    params: {
      i: id
    }
  });
  return response.data;
};
