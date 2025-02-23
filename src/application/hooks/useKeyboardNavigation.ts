import { useState, useEffect, RefObject } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTMDB } from '../contexts/TMDBContext';
import { Movie } from '../../domain/entities/Movie';
interface UseKeyboardNavigationProps {
  results: Movie[];
  listRef: React.RefObject<HTMLDivElement>;
  onSelect?: (movie: Movie) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  suggestedText: string;
}

export function useKeyboardNavigation({
  results,
  listRef,
  onSelect,
  searchTerm,
  setSearchTerm,
  suggestedText
}: UseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [previousTerm, setPreviousTerm] = useState<string>('');
  const tmdb = useTMDB();
  const { toggleFavorite } = useFavorites();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowRight' && suggestedText) {
      e.preventDefault();
      setPreviousTerm(searchTerm);
      setSearchTerm(suggestedText);
    } else if (e.key === 'ArrowLeft' && previousTerm) {
      e.preventDefault();
      setSearchTerm(previousTerm);
      setPreviousTerm('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const newIndex = prev < results.length - 1 ? prev + 1 : prev;
        return newIndex;
      });

      // scrollToItem(newIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const newIndex = prev > 0 ? prev - 1 : prev;
        return newIndex;
      });
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedMovie = results[selectedIndex];
      if (selectedMovie) {
        if (onSelect) {
          onSelect(selectedMovie);
        } else {
          window.open(tmdb.getMovieUrl(selectedMovie.id.toString()), '_blank');
        }
      }
    } else if (e.key === ' ' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedMovie = results[selectedIndex];
      if (selectedMovie) {
        toggleFavorite(selectedMovie);
      }
    }
  };

  const scrollToItem = (index: number) => {
    const selectedElement = listRef.current?.children[index];
    if (selectedElement) {
      selectedElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0) {
      scrollToItem(selectedIndex);
    }
  }, [selectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
} 