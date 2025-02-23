import React from 'react';
import { Star } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Movie } from '../../domain/entities/Movie';

interface FeaturedMovieResultProps {
  movie: Movie;
  searchTerm: string;
  selectedIndex: number;
  onMouseEnter: () => void;
  highlightMatch: (text: string, search: string) => React.ReactNode;
}

const FeaturedMovieResult: React.FC<FeaturedMovieResultProps> = ({
  movie,
  searchTerm,
  selectedIndex,
  onMouseEnter,
  highlightMatch
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <a
      href={`https://www.imdb.com/title/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 sm:p-4 flex items-start gap-3 sm:gap-4 border-b ${
        selectedIndex === 0 ? 'bg-blue-50' : 'bg-white'
      } hover:bg-gray-50 transition-colors`}
      onMouseEnter={onMouseEnter}
    >
      <div className="relative aspect-[2/3] w-16 sm:w-20 flex-shrink-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm sm:text-base font-medium truncate">
            {highlightMatch(movie.title, searchTerm)}
            <span className="text-gray-500 ml-2">({movie.year})</span>
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie);
            }}
            className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
          >
            <Star
              className={isFavorite(movie.id) 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-400"}
              size={16}
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {movie.genres.map(genre => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs bg-gray-100 rounded-full text-gray-700"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default FeaturedMovieResult; 