import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  TextField,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { getMovies } from '../redux/movieSlice';
import { AppDispatch } from '../redux/store';

interface FilterPartProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  year: string | null;
  setYear: React.Dispatch<React.SetStateAction<string | null>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  page: number;
}

const FilterPart: React.FC<FilterPartProps> = ({
  search,
  setSearch,
  year,
  setYear,
  type,
  setType,
  page,
}) => {
  const dispatch = useDispatch<AppDispatch>();

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

  const handleTypeChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
    dispatch(getMovies({ search, type: newValue, year, page: 1 }));
  };

  return (
    <>
      <Box style={{ marginBottom: '20px' }}>
        <TextField
          label="Search for Movies"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Box style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <TextField
          label="Year"
          variant="outlined"
          type="number"
          value={year || ''}
          onChange={(e) => setYear(e.target.value || null)}
          style={{ flex: 1 }}
        />
        <Tabs
          value={type}
          onChange={handleTypeChange}
          indicatorColor="primary"
          textColor="primary"
          style={{ flex: 1 }}
        >
          <Tab label="All" value="" />
          <Tab label="Movie" value="movie" />
          <Tab label="TV Series" value="series" />
          <Tab label="Episode" value="episode" />
        </Tabs>
      </Box>
    </>
  );
};

export default FilterPart;
