import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { notify, toastOptions } from '../../helpers/hot-toast';

import css from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
  });

  const movies = data?.results ?? [];

  const totalPages = data?.total_page ?? 0;
  console.log(totalPages);

  if (!isLoading && !isError && query && movies.length === 0) {
    notify('No movies found for your request.');
  }

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster toastOptions={toastOptions} />
      {isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {isLoading && <Loader />}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
