import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { TextField, Tabs, Tab, Box } from "@mui/material";
import { getMovies } from "../redux/movieSlice";
import { AppDispatch } from "../redux/store";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface FilterPartProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  year: string | null;
  setYear: React.Dispatch<React.SetStateAction<string | null>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterPart: React.FC<FilterPartProps> = ({
  search,
  setSearch,
  year,
  setYear,
  type,
  setType,
  setPage
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(getMovies({ search: query, type, year, page: 1 }));
    }, 500),
    [dispatch, type, year]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPage(1);
    setSearch(value);
    debouncedSearch(value);
  };

  const handleTypeChange = (_: React.SyntheticEvent, newValue: string) => {
    setPage(1);
    setType(newValue);
    dispatch(getMovies({ search, type: newValue, year, page: 1 }));
  };
  const currentYear = dayjs();
  return (
    <>
      <Box style={{ marginBottom: "20px" }}>
        <TextField
          label="Search for Movies"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Box style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Years"
            maxDate={currentYear}
            openTo="year"
            views={["year"]}
            yearsOrder="desc"
            sx={{ minWidth: 250 }}
            onChange={(date: Dayjs | null) =>
             {
              setPage(1);
              setYear(date?.year().toString() || null);
              dispatch(getMovies({ search: search, type, year:date?.year().toString() || null, page: 1 }));
             }
            
              // dispatch(getMovies({ search: search, type, year:date?.year().toString() as string, page: 1 }))
            }
          />
        </LocalizationProvider>
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
