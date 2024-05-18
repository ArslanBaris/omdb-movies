import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiKey } from '../constants/defaultValues';
import axios from 'axios';
import { Movie } from '../types/Movie';
import { CircularProgress, Rating } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import MovieContent from '../components/MovieDetail/MovieContent';
import InfoBar from '../components/MovieDetail/InfoBar';

const MovieDetail = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovieDetail();
  }, [movie_id]);

  const getMovieDetail = async () => {
    await axios.get(`http://www.omdbapi.com/?i=${movie_id}&apikey=${apiKey}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {
        !movie ?
          <div className='h-[50vh] flex items-center justify-center'>
            <CircularProgress />
          </div>
          :
          <>
            <MovieContent movie={movie} />
            <InfoBar Runtime={movie?.Runtime} BoxOffice={movie?.BoxOffice} Director={movie?.Director} />
          </>
      }
    </>
  );
}

export default MovieDetail;