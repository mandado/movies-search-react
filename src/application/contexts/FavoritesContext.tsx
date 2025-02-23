import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Movie } from '../../domain/entities/Movie';
import { LocalStorageRepository } from '../../domain/repositories/LocalStorageRepository';

interface FavoritesContextData {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: string) => boolean;
}

const favoriteRepository = new LocalStorageRepository();
const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = favoriteRepository.getFavorites();
    
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const isCurrentlyFavorite = favoriteRepository.isFavorite(movie.id);
    
    if (isCurrentlyFavorite) {
      favoriteRepository.removeFavorite(movie.id);
      setFavorites(prev => prev.filter(f => f.id !== movie.id));
    } else {
      favoriteRepository.addFavorite(movie);
      setFavorites(prev => [...prev, movie]);
    }
  };

  const isFavorite = (movieId: string) => {
    return favoriteRepository.isFavorite(movieId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext); 