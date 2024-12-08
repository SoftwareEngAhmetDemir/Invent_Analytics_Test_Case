import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import debounce from 'lodash.debounce';
import {
  TextField,
  Grid,
  Pagination,
  CircularProgress,
} from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading } = useSelector((state: RootState) => state.movies);

  const [search, setSearch] = useState<string>('Pokemon');
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<string | null>('Movie');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getMovies({ search, type, year, page }));
  }, [dispatch, type, year, page]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(getMovies({ search: query, type, year, page: 1 }));
    }, 300),
    [dispatch, type, year, page]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        {/* Search Field with debounce */}
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
        <TextField
          label="Year"
          variant="outlined"
          type="number"
          value={year || ''}
          onChange={(e) => setYear(e.target.value || null)}
          style={{ marginLeft: '16px' }}
        />
      </div>

      {loading ? (
        <CircularProgress />
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
                style={{ marginBottom: '16px' }}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          
          <Pagination
            count={Math.ceil(totalResults / 10)}
            page={page}
            onChange={handlePageChange}
            style={{ marginTop: '16px' }}
          />
        </>
      )}
    </div>
  );
};

export default MovieGrid;
