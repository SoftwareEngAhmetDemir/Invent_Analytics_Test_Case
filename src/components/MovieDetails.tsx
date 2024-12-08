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
  Grid,
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
        <Typography variant="h6" mt={2}>
          Loading movie details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 4, p: 0 }}>
        <Card elevation={4} sx={{ borderRadius: { lg: 4, sm: 0 } }}>
          <Grid container spacing={2}>
            {/* Movie Poster */}
            <Grid item xs={24} md={4}>
              <CardMedia
                component="img"
                image={posterError ? placeholderImage : movieDetails?.Poster}
                alt={movieDetails?.Title}
                onError={handleImageError}
                sx={{
                  minWidth: "250px",
                  width: "100%",
                  borderRadius: { lg: 4, sm: 0 },
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>
            {/* Movie Details Section */}
            <Grid item xs={24} md={8}>
              <CardContent>
                {/* Back Button & Title */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {movieDetails?.Title}
                  </Typography>
                  <IconButton color="primary" href="/">
                    <ArrowBackIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Overview */}
                <Typography variant="h6" gutterBottom>
                  Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  {movieDetails?.Plot || "No plot description available."}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Details Section */}
                <Grid container spacing={2}>
                  <Grid item sm={24} md={6}>
                    <Typography>
                      <strong>Director:</strong>{" "}
                      {movieDetails?.Director || "N/A"}
                    </Typography>
                    <Typography marginTop={ '10px'}>
                      <strong>Cast:</strong> {movieDetails?.Actors || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item sm={24} md={6}>
                    <Typography>
                      <strong>Genre:</strong> {movieDetails?.Genre || "N/A"}
                    </Typography>
                    <Typography marginTop={ '10px'}>
                      <strong>Release Date:</strong>{" "}
                      {movieDetails?.Released || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item sm={24} md={6}>
                    <Typography >
                      <strong>Duration:</strong>{" "}
                      {movieDetails?.Runtime || "N/A"}
                    </Typography>
                    <Typography marginTop={ '10px'}>
                      <strong>IMDb Rating:</strong>{" "}
                      {movieDetails?.imdbRating || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default MovieDetails;
