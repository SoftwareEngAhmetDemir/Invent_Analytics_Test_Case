import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import s from "../styles/MovieDetails.module.scss";

const placeholderImage = process.env.REACT_APP_PLACEHOLDER_IMAGE;

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetails, loadingDetails } = useSelector(
    (state: RootState) => state.movies
  );

  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    dispatch(getMovieDetails(id!));
  }, [dispatch, id]);

  const handleImageError = () => {
    setPosterError(true);
  };

  if (loadingDetails) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography>Loading movie details...</Typography>
      </Box>
    );
  }

  return (
    <div className={s.movieDetails}>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Card elevation={4} className={s.mainCard}>
          {/* Hero Section - Movie Poster */}
          <CardMedia
            component="img"
            height="600"
            image={posterError ? placeholderImage : movieDetails?.Poster}
            alt={movieDetails?.Title}
            onError={handleImageError}
            sx={{
              objectFit: "fill",
              height: { xs: "300px", sm: "600px" }, // Responsive
            }}
          />

          {/* Content Section */}
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" gutterBottom>
                {movieDetails?.Title}
              </Typography>
              <IconButton color="primary" href="/">
                <ArrowBackIcon />
              </IconButton>
            </Box>

            <Divider />

            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {movieDetails?.Plot || "No plot description available."}
              </Typography>
            </Box>

            <Divider />

            <Box mt={2} mb={2}>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography>
                <strong>Director:</strong> {movieDetails?.Director || "N/A"}
              </Typography>
              <Typography>
                <strong>Cast:</strong> {movieDetails?.Actors || "N/A"}
              </Typography>
              <Typography>
                <strong>Genre:</strong> {movieDetails?.Genre || "N/A"}
              </Typography>
              <Typography>
                <strong>Release Date:</strong> {movieDetails?.Released || "N/A"}
              </Typography>
              <Typography>
                <strong>Duration:</strong> {movieDetails?.Runtime || "N/A"}
              </Typography>
            </Box>
            <Divider/>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Ratings
              </Typography>
              <Typography>
                <strong>IMDb Rating:</strong>{" "}
                {movieDetails?.imdbRating || "N/A"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default MovieDetails;
