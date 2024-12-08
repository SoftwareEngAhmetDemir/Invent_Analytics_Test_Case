import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails, Movie, MovieDetails } from '../api/omdbApi';

interface MovieState {
  movies: Movie[];
  movieDetails: MovieDetails | null;
  totalResults: number;
  loading: boolean;
}

const initialState: MovieState = {
  movies: [],
  movieDetails: null,
  totalResults: 0,
  loading: false,
};

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async ({
    search,
    type,
    year,
    page,
  }: {
    search: string;
    type: string | null;
    year: string | null;
    page: number;
  }) => {
    return await fetchMovies(search, type, year, page);
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (id: string) => {
    return await fetchMovieDetails(id);
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults, 10) || 0;
        state.loading = false;
      })
      .addCase(getMovies.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
      });
  },
});

export default movieSlice.reducer;
