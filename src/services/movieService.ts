import axios from 'axios';

import type { Movie } from './../types/movie';

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
  total_page: number;
}

export const fetchMovies = async (query: string, page: number) => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&${page}`,
    {
      params: {},
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};
