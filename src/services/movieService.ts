import axios from 'axios';

import type { Movie } from './../types/movie';

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (movieQuery: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&include_adult=false&language=en-US&page=1`,
    {
      params: {
        method: 'GET',
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data.results;
};
