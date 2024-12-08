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

const placeholderImage = process.env.REACT_APP_PLACEHOLDER_IMAGE;

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
        paddingX: "8px",
        paddingY: "32px"
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
          image={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : placeholderImage
          } // Fallback to demo image
          alt={movie.Title}
          sx={{
            width: "100%",
            height: cardHeight,
            objectFit: "cover",
           
          }}
        />
        {/* Movie Title */}
        <CardContent
          sx={{
            textAlign: "center",
           marginTop:'10px',
            flexGrow: 1,
            width: "100%"
          }}
        >
          <Typography variant="h6">{movie.Title}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MovieCard;
