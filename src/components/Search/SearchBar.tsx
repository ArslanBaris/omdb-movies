import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTypeFilter, setYearFilter, setTitleFilter } from '../../redux/actions';
import { Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import './style.scss'

const SearchBar = () => {
    const dispatch = useDispatch();

    const { yearFilter, typeFilter, titleFilter } = useSelector((state: any) => state.movies);

    const [searchTitle, setSearchTitle] = useState(titleFilter);
    const [searchType, setSearchType] = useState(typeFilter);
    const [searchYear, setSearchYear] = useState(yearFilter);
    const [typingTimeout, setTypingTimeout] = useState(0);

    const handleChange = (value: string, type: string) => {
        switch (type) {
            case 'searchYear':
                setSearchYear(value)
                break;
            case 'searchType':
                setSearchType(value)
                break;
            case 'searchTitle':
                setSearchTitle(value)
                break;
            default:
                break;
        }

        if (value != null || value !== undefined) {

            if (type === 'searchType') {
                dispatch(setTypeFilter(value));
            } else {

                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                }

                setTypingTimeout(
                    window.setTimeout(function () {
                        if (type === 'searchYear') {
                            dispatch(setYearFilter(value));
                        } else if (type === 'searchTitle') {
                            dispatch(setTitleFilter(value));
                        }

                    }, 800)
                );
            }
        }
    }



    return (
        <div className='justify-between flex w-[60%] '>
            <div className='w-[30%]'>
                <div className='search-content'>
                    <TextField
                        label="Search for a Title"
                        sx={{ width: '100%', height: "40px" }}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={searchTitle}
                        onChange={(e) => { handleChange(e.target.value, 'searchTitle') }}
                    />
                </div>
            </div>
            <div className='w-[30%]'>
                <div className='search-content'>
                    <TextField
                        select
                        label="Search for a Type"
                        value={searchType}
                        sx={{ width: '100%', height: "40px" }}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => { handleChange(e.target.value, 'searchType') }}
                    >
                        <MenuItem className='select-option' value={""}>All</MenuItem>
                        <MenuItem className='select-option' value={"movie"}>Movie</MenuItem>
                        <MenuItem className='select-option' value={"series"}>Series</MenuItem>
                        <MenuItem className='select-option' value={"episode"}>Episode</MenuItem>
                    </TextField>


                </div>
            </div>
            <div className='w-[30%]'>
                <div className='search-content'>
                    <TextField
                        label="Search for a Year"
                        sx={{ width: '100%', height: "40px" }}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={searchYear}
                        onChange={(e) => { handleChange(e.target.value, 'searchYear') }}
                    />

                </div>
            </div>

        </div>
    );
};

export default SearchBar;