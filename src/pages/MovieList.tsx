import MoviesTable from '../components/Movies/MoviesTable';
import SearchBar from '../components/Search/SearchBar';

const MovieList = () => {

  return (
      <div className="flex items-center justify-center flex-wrap gap-2 md:gap-5 px-3 md:px-10 mt-10">
        <SearchBar />
        <MoviesTable />
      </div>
  );
};

export default MovieList;
