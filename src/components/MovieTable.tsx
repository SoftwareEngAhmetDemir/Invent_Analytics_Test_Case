import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
}
const placeholderImage = process.env.REACT_APP_PLACEHOLDER_IMAGE;

const MovieTable: React.FC<MovieTableProps> = ({ movies, onRowClick }) => {
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
          {movies.map((movie) => (
            <TableRow
              key={movie.imdbID}
              onClick={() => onRowClick(movie.imdbID)}
              className="cursor-pointer"
              hover
            >
              <TableCell className={s.reducedPadding}>
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
                  alt={movie.Title}
                  width="30px"
                  height="40px"
                  loading="lazy"
                />
              </TableCell>
              <TableCell className={s.reducedPadding}>{movie.Title}</TableCell>
              <TableCell className={s.reducedPadding}>{movie.Year}</TableCell>
              <TableCell className={s.reducedPadding}>{movie.Type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
