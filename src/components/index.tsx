import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovies, setMovieFilter } from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import FilterPart from "./FilterPart";
import PaginationComponent from "./PaginationComponent";
import MovieTable from "./MovieTable"; // Import the new component
import { Iseaching } from "../entities/movie";
import s from "../styles/list.module.scss";

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  const handleRowClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className={s.list}>
      <Box>
        <Box className={s.containerFilter}>
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
        {loading ? (
          <Box className={s.loadingPos}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {movies && movies.length > 0 ? (
              <>
                <MovieTable movies={movies} onRowClick={handleRowClick} />
                <PaginationComponent
                  totalResults={totalResults}
                  page={page}
                  pageSize={10}
                  handlePageChange={handlePageChange}
                />
              </>
            ) : (
              <Box className={s.result}>
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
