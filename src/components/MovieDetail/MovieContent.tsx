import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, IconButton, Rating } from '@mui/material';
import './style.scss';
import { ArrowBack, CalendarMonth, StarSharp, Stars, StarsOutlined, StarsRounded } from '@mui/icons-material';
import { Movie } from '../../types/Movie';
import Thumb from './Thumb';
import InfoBar from './InfoBar';
import { convertToStarRating } from '../../utils/Utils';


const MovieContent = ({ movie }: { movie: Movie }) => {

    const navigate = useNavigate()


    return (
        <>

            <div className='movie-wrapper'>
                <div className='w-[100%] items-start justify-start flex mb-3 px-0  lg:px-10'>
                    <IconButton className='back-button' onClick={() => navigate("/")}><ArrowBack /></IconButton>
                </div>

                <div className='movie-content'>
                    <Thumb image={movie?.Poster} rating={parseFloat(movie?.imdbRating)} />

                    <div className='movie-text space-y-4 mt-3'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className=''>{movie?.Title}</h1>
                                <span className='text-md mt-3'>
                                    {movie?.Genre}
                                </span>
                            </div>

                            <div className='flex mt-3 ml-3'>
                                <CalendarMonth className='mr-2' />
                                <span className='text-lg'> {movie?.Year}</span>
                            </div>
                        </div>

                        <div>
                            <h3>Plot</h3>
                            <p>{movie?.Plot}</p>
                        </div>

                        <div>
                            <h3>Actors</h3>
                            <p>{movie?.Actors}</p>
                        </div>

                        <div>
                            <h3>Languages</h3>
                            <p>{movie?.Language}</p>
                        </div>



                        <div className="rating-directors">
                            {/* <div className="director">
                                <h3>DIRECTOR</h3>
                               <p>{movie?.Director}</p>
                            </div> */}

                            <div className='ratings'>
                                <h3>Ratings</h3>
                                {
                                    movie?.Ratings?.map((rating, index) => (
                                        <div key={index} className='flex items-center'>
                                            <span className='ml-2 w-[180px]'>{rating.Source}</span>
                                            <span>: {rating?.Value}</span>

                                        </div>
                                    ))
                                }
                            </div>

                            <div>
                                <h3 className='mb-2'>RATING</h3>
                                <div className='flex items-center gap-3'>
                                    <Rating sx={{ fontSize: "28px" }} name="read-only" precision={0.2} value={convertToStarRating(parseFloat(movie?.imdbRating))} readOnly />
                                    <div className="score">{movie?.imdbRating == "N/A" ? "?" : movie?.imdbRating}</div>
                                </div>
                            </div>
                        </div>




                    </div>

                    {/* 

                <div className="rating-directors">
                
                  <div className="director">
                    <h3>DIRECTOR{movie?.Director?.length ?? 0 > 1 ? "S" : ""}</h3>
                    {Array.isArray(movie?.Director) ? movie?.Director?.map((director, index) => (
                      <p key={index}>{director}</p>
                    )) : <p>{movie?.Director}</p>}
                  </div>
                </div> */}
                </div>
            </div>




        </>
    );
}

export default MovieContent;