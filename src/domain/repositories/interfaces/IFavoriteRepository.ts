import { Movie } from '../../entities/Movie';

export interface IFavoriteRepository {
  getFavorites(): Movie[];
  addFavorite(movie: Movie): void;
  removeFavorite(movieId: string): void;
  isFavorite(movieId: string): boolean;
} 