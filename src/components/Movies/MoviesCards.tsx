import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { apiKey, apiUrl } from '../../constants/defaultValues';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const MoviesCards = () => {
    const { yearFilter, typeFilter, titleFilter } = useSelector((state: any) => state.movies);

    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [firstLoader, setFirstLoader] = useState(false);
    const [loadMoreLoader, setLoadMoreLoader] = useState(false);

    const cancelTokenRef = useRef<any>(null);

    const getMovies = async ({ year, type, title, page }: { year: string, type: string, title: string, page: number }) => {

        if (page == 0)
            setFirstLoader(true)
        else
            setLoadMoreLoader(true)

        if (cancelTokenRef.current) {
            cancelTokenRef.current.cancel('Operation canceled due to new request.');
        }

        cancelTokenRef.current = axios.CancelToken.source();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                apikey: `${apiKey}`,
                page: page,
                s: title || 'Pokemon',
                y: year || undefined,
                type: type || undefined,
            },
            cancelToken: cancelTokenRef.current.token,
        };

        await axios.get(`${apiUrl}`, config)
            .then((resp): any => {
                if (resp.data.Response === "True") {
                    setMovies((prev) => (page === 1 ? resp.data.Search : [...prev, ...resp.data.Search]));
                    setTotalResults(resp.data.totalResults);
                } else {
                    setMovies([]);
                    setTotalResults(0);
                }

                setLoadMoreLoader(false)
                setFirstLoader(false)
            }).catch((err) => {
                setLoadMoreLoader(false);
                setFirstLoader(false)

                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message);
                } else {
                    console.error(err);
                }
            })
    }

    useEffect(() => {
        getMovies({ year: yearFilter, type: typeFilter, title: titleFilter, page });
    }, [yearFilter, typeFilter, titleFilter, page]);


    useEffect(() => {
        setPage(1);
        setFirstLoader(true);
    }, [yearFilter, typeFilter, titleFilter]);



    return (
        <div>
            <div className="flex items-center justify-center flex-wrap gap-2 md:gap-5 px-3 md:px-10">
                {firstLoader
                    ? Array.from({ length: 5 }).map((_, index) => <div className="card-placeholder" key={index}></div>)
                    : movies && movies?.length !== 0 && movies.map((movie, index) => <MovieCard key={index} movie={movie} />)}
            </div>
            <div className='flex justify-center relative'>
                {
                    loadMoreLoader &&
                    <div className='my-10'>
                        <CircularProgress />
                    </div>
                }
                {
                    totalResults > movies.length && !loadMoreLoader &&
                    <div className='my-10 w-[50%]'>
                        <Button variant='outlined' fullWidth onClick={() => setPage((prevPage) => prevPage + 1)}>Load More</Button>
                    </div>
                }
                {
                    movies.length > 10 &&
                    <IconButton size='medium' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='scroll-up-button' color='primary'>
                        <ArrowUpward />
                    </IconButton>
                }


            </div>
        </div>
    );
};

export default MoviesCards;
