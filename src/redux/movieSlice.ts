import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies, fetchMovieDetails } from "../api/omdbApi";
import { Iseaching, MovieState } from "../entities/movie";

const initialState: MovieState = {
  movies: [],
  movieDetails: null,
  totalResults: 0,
  loading: false,
  searching: {
    title: null,
    year: null,
    type: null,
    page: 1,
  },
  loadingDetails: false,
};

export const getMovies = createAsyncThunk(
  "movies/getMovies",
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
  "movies/getMovieDetails",
  async (id: string) => {
    return await fetchMovieDetails(id);
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieFilter: (state, action: PayloadAction<Iseaching>) => {
      state.searching = {
        ...action.payload,
      };
    },
  },
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
      .addCase(getMovieDetails.pending, (state) => {
        state.loadingDetails = true;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.loadingDetails = false;
      })
      .addCase(getMovieDetails.rejected, (state) => {
        state.loadingDetails = false;
      });
  },
});
export const { setMovieFilter } = movieSlice.actions;

export default movieSlice.reducer;
