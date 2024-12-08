import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import FilterPart from "./FilterPart";
import PaginationComponent from "./PaginationComponent";

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading } = useSelector(
    (state: RootState) => state.movies
  );
  const movieSearhcing = useSelector(
    (state: RootState) => state.movies.searching
  ) as {  title: null|string,
    year: null|string,
    type: null|string};
  const [search, setSearch] = useState<string>(movieSearhcing.title||"Pokemon");
  const [year, setYear] = useState<string | null>(movieSearhcing.year||null);
  const [type, setType] = useState<string>(movieSearhcing.type||"");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getMovies({ search, type, year, page }));
  }, [page]);

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
          padding:'0'
        }}
      >
        <Box
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            padding: '32px',
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
            setPage={setPage}
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
            {movies && movies.length > 0 ? (
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
                      <MovieCard movie={movie} key={movie.imdbID}/>
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
              <Box
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {/* Placeholder Image */}
                <Typography variant="h6" color="textSecondary">
                 {search?.length>0?"No data found":"Please Write The Film You want to Search "}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default MovieGrid;
