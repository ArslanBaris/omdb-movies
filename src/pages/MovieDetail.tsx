import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiKey, apiUrl } from '../constants/defaultValues';
import axios from 'axios';
import { Movie } from '../types/Movie';
import { CircularProgress } from '@mui/material';
import MovieContent from '../components/MovieDetail/MovieContent';
import InfoBar from '../components/MovieDetail/InfoBar';

const MovieDetail = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);


  const getMovieDetail = useCallback(async () => {

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apikey: `${apiKey}`,
        i: `${movie_id}`
      }
    }

    await axios.get(`${apiUrl}`,config)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id])


  useEffect(() => {
    getMovieDetail();
  }, [getMovieDetail]);

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
            <InfoBar Runtime={movie?.Runtime} BoxOffice={movie?.BoxOffice} Released={movie?.Released} />
          </>
      }
    </>
  );
}

export default MovieDetail;