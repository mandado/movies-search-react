import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoriteMovies: React.FC = () => {
  const { favorites } = useFavorites();
  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Filmes Favoritos</h2>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map(movie => (
          <div 
            key={movie.id}
            className="border rounded-md p-3 sm:p-4 flex flex-col bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[2/3] mb-3">
              <img
                src={movie.poster}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="font-medium text-sm sm:text-base line-clamp-2">{movie.title}</h3>
            <p className="text-gray-500 text-xs sm:text-sm">{movie.year}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
              {movie.genres.map(genre => (
                <span
                  key={genre}
                  className="px-2 py-0.5 text-xs bg-gray-100 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies; 