import { Movie } from '../../domain/entities/Movie';
import { IFavoriteRepository } from '../../domain/repositories/interfaces/IFavoriteRepository';
import { LocalStorageAdapter } from '../../infrastructure/storage/adapters/localStorageAdapter';
import { Storage } from '../../infrastructure/storage/storage';

const storage = new Storage(new LocalStorageAdapter());

export class LocalStorageRepository implements IFavoriteRepository {
  private readonly STORAGE_KEY = '@MovieApp:favorites';

  getFavorites(): Movie[] {
    const data = storage.get<Movie[]>(this.STORAGE_KEY, []);
    return data || [];
  }

  addFavorite(movie: Movie): void {
    const favorites = this.getFavorites();
    const updatedFavorites = [...favorites, movie.toJSON()];
    storage.set(this.STORAGE_KEY, updatedFavorites);
  }

  removeFavorite(movieId: string): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    storage.set(this.STORAGE_KEY, updatedFavorites);
  }

  isFavorite(movieId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(movie => movie.id === movieId);
  }
}