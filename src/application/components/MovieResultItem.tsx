import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../../domain/entities/Movie';
import { useFavorites } from '../contexts/FavoritesContext';

interface MovieResultItemProps {
  movie: Movie;
  searchTerm: string;
  index: number;
  selectedIndex: number;
  onMouseEnter: () => void;
  highlightMatch: (text: string, search: string) => React.ReactNode;
}

const MovieResultItem: React.FC<MovieResultItemProps> = ({
  movie,
  searchTerm,
  index,
  selectedIndex,
  onMouseEnter,
  highlightMatch
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(movie.id);
      setIsFavorited(result);
    };
    checkFavorite();
  }, [movie.id, isFavorite]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
   
    toggleFavorite(movie);
   
    setIsFavorited(isFavorite(movie.id));
  };

  return (
    <a
      href={`https://www.imdb.com/title/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 flex items-center justify-between hover:bg-gray-50 ${
        selectedIndex === index + 1 ? 'bg-gray-50' : ''
      }`}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex-1">
        <span className="text-blue-500">
          {highlightMatch(movie.title, searchTerm)}
        </span>
      </div>
      <button
        onClick={handleToggleFavorite}
        className="p-1 hover:bg-gray-100 rounded ml-2"
      >
        <Star
          className={isFavorited 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-400"}
          size={16}
        />
      </button>
    </a>
  );
};

export default MovieResultItem; 