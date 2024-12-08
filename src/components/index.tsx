import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, setMovieFilter } from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import FilterPart from "./FilterPart";
import PaginationComponent from "./PaginationComponent";
import { Iseaching } from "../entities/movie";
import s from "../styles/list.module.scss";
const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading } = useSelector(
    (state: RootState) => state.movies
  );
  const movieSearhcing = useSelector(
    (state: RootState) => state.movies.searching
  ) as Iseaching;
  const [search, setSearch] = useState<string>(
    movieSearhcing.title || "Pokemon"
  );
  const [year, setYear] = useState<string | null>(movieSearhcing.year || null);
  const [type, setType] = useState<string>(movieSearhcing.type || "");
  const [page, setPage] = useState<number>(movieSearhcing.page || 1);

  useEffect(() => {
    dispatch(getMovies({ search, type, year, page }));
    dispatch(setMovieFilter({ ...movieSearhcing, page }));
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className={s.list}>
      {/* Page background and wrapper */}
      <Box>
        <Box className={s.containerFilter}>
          {/* Filter component */}
          <FilterPart
            search={search}
            setSearch={setSearch}
            year={year}
            setYear={setYear}
            type={type}
            setType={setType}
            setPage={setPage}
          />
        </Box>
        <br />
        {/* Movie Grid & loader */}
        {loading ? (
          <Box className={s.loadingPos}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {movies && movies.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                      <MovieCard movie={movie} key={movie.imdbID} />
                    </Grid>
                  ))}
                </Grid>
                <PaginationComponent
                  totalResults={totalResults}
                  page={page}
                  pageSize={10}
                  handlePageChange={handlePageChange}
                />
              </>
            ) : (
              <Box className={s.result}>
                {/* Placeholder Image */}
                <Typography variant="h6" color="textSecondary">
                  {search?.length > 0
                    ? "No data found"
                    : "Please Write The Film You want to Search "}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default MovieGrid;
