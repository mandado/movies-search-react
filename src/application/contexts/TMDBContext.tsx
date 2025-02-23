import { createContext, ReactNode, useContext } from 'react';

interface TMDBContextData {
  baseUrl: string;
  imageUrl: string;
  fetchOptions: {
    headers: {
      Authorization: string;
      'Content-Type': string;
    };
  };
  endpoints: {
    search: string;
    movie: string;
  };
  getMovieUrl: (movieId: string) => string;
}

const TMDBContext = createContext<TMDBContextData>({} as TMDBContextData);

export function TMDBProvider({ children }: { children: ReactNode }) {
  const apiKey = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const baseUrl = 'https://api.themoviedb.org/3';
  const imageUrl = 'https://image.tmdb.org/t/p';

  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  };

  const endpoints = {
    search: '/search/movie',
    movie: '/movie'
  };


  const getMovieUrl = (movieId: string): string => {
    return `${baseUrl}${endpoints.movie}/${movieId}`;
  };

  const value = {
    baseUrl,
    imageUrl,
    fetchOptions,
    endpoints,
    getMovieUrl
  };

  return (
    <TMDBContext.Provider value={value}>
      {children}
    </TMDBContext.Provider>
  );
}

export const useTMDB = () => {
  const context = useContext(TMDBContext);
  if (!context) {
    throw new Error('useTMDB deve ser usado dentro de um TMDBProvider');
  }
  return context;
};

export type { TMDBContextData };
