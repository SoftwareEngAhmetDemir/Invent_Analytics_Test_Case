import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Define Props interface
interface MovieCardProps {
  movie: {
    imdbID: string;
    Poster: string;
    Title: string;
  };
  cardHeight?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, cardHeight = 220 }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        maxWidth: "100%",
        padding: "8px"
      }}
    >
      <Link
        to={`/movie/${movie.imdbID}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          width: "100%"
        }}
      >
        {/* Movie Poster */}
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          sx={{
            width: "100%",
            height: cardHeight,
            objectFit: "contain"
          }}
        />
        {/* Movie Title */}
        <CardContent
          sx={{
            textAlign: "center",
            padding: "8px",
            flexGrow: 1,
            width: "100%"
          }}
        >
          <Typography variant="body2">{movie.Title}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MovieCard;
