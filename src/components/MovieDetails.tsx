import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useParams } from 'react-router-dom';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetails } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(id!));
  }, [dispatch, id]);

  return movieDetails ? (
    <div>
      <img src={movieDetails.Poster} alt={movieDetails.Title} />
      <h1>{movieDetails.Title}</h1>
      <p>Director: {movieDetails.Director}</p>
      <p>Cast: {movieDetails.Actors}</p>
      <p>Genre: {movieDetails.Genre}</p>
      <p>Rating: {movieDetails.imdbRating}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default MovieDetails;
