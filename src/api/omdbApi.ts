import { MovieDetails, MovieResponse } from "../entities/movie";
import axiosInstance from "../util/axiosInstance";


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
