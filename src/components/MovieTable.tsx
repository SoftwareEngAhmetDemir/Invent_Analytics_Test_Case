import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import s from "../styles/table.module.scss";

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
}

interface MovieTableProps {
  movies: Movie[];
  onRowClick: (imdbID: string) => void;
  loading: boolean;
}

const placeholderImage =
  process.env.REACT_APP_PLACEHOLDER_IMAGE ||
  "https://via.placeholder.com/50x75.png?text=No+Image";

const MovieTable: React.FC<MovieTableProps> = ({
  movies,
  onRowClick,
  loading,
}) => {
  return (
    <TableContainer component={Paper} className={s.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={s.headers}>Poster</TableCell>
            <TableCell className={s.headers}>Title</TableCell>
            <TableCell className={s.headers}>Year</TableCell>
            <TableCell className={s.headers}>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center" className={s.paddingMsgs}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : movies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" className={s.paddingMsgs}>
                No data available
              </TableCell>
            </TableRow>
          ) : (
            movies.map((movie) => (
              <TableRow
                key={movie.imdbID}
                onClick={() => onRowClick(movie.imdbID)}
                className="cursor-pointer"
                hover
              >
                <TableCell className={s.reducedPadding}>
                  <img
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : placeholderImage
                    }
                    alt={movie.Title}
                    width="30px"
                    height="40px"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className={s.reducedPadding}>
                  {movie.Title}
                </TableCell>
                <TableCell className={s.reducedPadding}>{movie.Year}</TableCell>
                <TableCell className={s.reducedPadding}>{movie.Type}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
