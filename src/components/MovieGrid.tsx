import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Grid, CircularProgress, Box, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";
import FilterPart from "./FilterPart";
import PaginationComponent from "./PaginationComponent";

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading } = useSelector(
    (state: RootState) => state.movies
  );

  const [search, setSearch] = useState<string>("Pokemon");
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getMovies({ search, type, year, page }));
  }, [dispatch, type, year, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      {/* Page background and wrapper */}
      <Box
        style={{
          minHeight: "100vh",
        }}
      >
        <Box
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
            ,padding:'32px'
          }}
        >
          {/* Filter component */}
          <FilterPart
            search={search}
            setSearch={setSearch}
            year={year}
            setYear={setYear}
            type={type}
            setType={setType}
            page={page}
          />
        </Box>
        <br />
        {/* Movie Grid & loader */}
        {loading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh"
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {movies.map((movie) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={movie.imdbID}
                
                >
                  <MovieCard movie={movie} />
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
        )}
      </Box>
    </>
  );
};

export default MovieGrid;
