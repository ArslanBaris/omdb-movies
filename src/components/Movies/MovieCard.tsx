import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { truncateString } from '../../utils/Utils';
import { CalendarMonth } from '@mui/icons-material'
import './style.scss'

type MovieProps = {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}

const MovieCard = ({ movie }: { movie: MovieProps }) => {

    const navigate = useNavigate();

    return (
        <div className="my-2">
            <Card className='movie-card' sx={{ width: 300, height: 420, }} onClick={()=>{ navigate(`/movie/${movie.imdbID}`)}}>
                <CardActionArea>
                    <div className='card-header'>
                        <span style={{display:"flex", alignItems:"center"}} className='text-left font-bold text-slate-100'  >
                            <CalendarMonth className='mr-2' />
                            {movie.Year}
                        </span>
                    </div>
                    <CardMedia
                        component="img"
                        className='object-cover w-full movie-poster'
                        image={movie.Poster === 'N/A' ? '/images/no_image.jpg' : movie.Poster}
                        alt="movie-poster"
                    />
                    <CardContent className='card-title flex flex-col'>
                        <span className='text-left font-bold text-md absolute top-12'>
                            {truncateString(movie.Title, 25)}
                        </span>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}

export default MovieCard