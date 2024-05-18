import { Box, Tab, Tabs } from '@mui/material';
import MoviesTable from '../components/Movies/MoviesTable';
import SearchBar from '../components/Search/SearchBar';
import { useState } from 'react';
import MoviesCards from '../components/Movies/MoviesCards';

const MovieList = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-2 md:gap-5 px-3 md:px-10 mt-10">
        <SearchBar />
      </div>
      <div className='flex-1  px-3 md:px-20'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleChange} >
            <Tab label="Table" />
            <Tab label="Card" />
          </Tabs>
        </Box>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-2 md:gap-5 px-3 md:px-10 mt-10 pb-5">
        {activeTab === 0 && <MoviesTable />}
        {activeTab === 1 && <MoviesCards />}
      </div>

    </>
  );
};

export default MovieList;
