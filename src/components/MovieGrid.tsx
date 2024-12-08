import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import {
  TextField,
  Grid,
  Pagination,
  CircularProgress,
  MenuItem,
  Select,
} from '@mui/material';
import { Link } from 'react-router-dom';

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading } = useSelector((state: RootState) => state.movies);

  const [search, setSearch] = useState<string>('Pokemon');
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getMovies({ search, type, year, page }));
  }, [dispatch, search, type, year, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        <Select
          value={type || ''}
          onChange={(e) => setType(e.target.value || null)}
          displayEmpty
          style={{ marginLeft: '16px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="series">TV Series</MenuItem>
          <MenuItem value="episode">Episode</MenuItem>
        </Select>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                <Link to={`/movie/${movie.imdbID}`}>
                  <img src={movie.Poster} alt={movie.Title} style={{ width: '100%' }} />
                  <p>{movie.Title}</p>
                </Link>
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
