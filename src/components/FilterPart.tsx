import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { TextField, Tabs, Tab, Box } from "@mui/material";
import { getMovies, setMovieFilter } from "../redux/movieSlice";
import { AppDispatch, RootState } from "../redux/store";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import s from "../styles/filter.module.scss";
import { Iseaching } from "../entities/movie";

interface FilterPartProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  year: string | null;
  setYear: React.Dispatch<React.SetStateAction<string | null>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const currentYear = dayjs();
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
  const movieSearhcing = useSelector(
    (state: RootState) => state.movies.searching
  ) as Iseaching;
  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(getMovies({ search: query, type, year, page: 1 }));
      dispatch(
        setMovieFilter({
          ...movieSearhcing,
          title: query,
          type,
          year: year as string,
          page: 1
        })
      );
    }, 500),
    [dispatch, type, year]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPage(1);
    setSearch(value);
    debouncedSearch(value);
    dispatch(
      setMovieFilter({
        ...movieSearhcing,
        title: value,
        type,
        year: year as string
      })
    );
  };

  const handleTypeChange = (_: React.SyntheticEvent, newValue: string) => {
    setPage(1);
    setType(newValue);
    dispatch(getMovies({ search, type: newValue, year, page: 1 }));

    dispatch(setMovieFilter({ ...movieSearhcing, type: newValue }));
  };
  return (
    <div className={s.filter}>
      <Box className={s.leftSide}>
        <TextField
          label="Search for Movies"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          defaultValue={movieSearhcing.title}
        />
      </Box>
      <Box className={s.rightSide}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Years"
            maxDate={currentYear}
            openTo="year"
            views={["year"]}
            yearsOrder="desc"
            defaultValue={year ? dayjs().year(year as any) : null}
            className={s.datePicker}
            onChange={(date: Dayjs | null) => {
              dispatch(
                setMovieFilter({
                  ...movieSearhcing,
                  year: date?.year().toString() || null,
                  page: 1
                })
              );
              setPage(1);
              setYear(date?.year().toString() || null);
              dispatch(
                getMovies({
                  search: search,
                  type,
                  year: date?.year().toString() || null,
                  page: 1
                })
              );
            }}
          />
        </LocalizationProvider>
        <Tabs
          value={type}
          onChange={handleTypeChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All" value="" />
          <Tab label="Movie" value="movie" />
          <Tab label="TV Series" value="series" />
          <Tab label="Episode" value="episode" />
        </Tabs>
      </Box>
    </div>
  );
};

export default FilterPart;
