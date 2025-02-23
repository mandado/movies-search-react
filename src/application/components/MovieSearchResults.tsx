import React from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import FeaturedMovieResult from './FeaturedMovieResult';
import MovieResultItem from './MovieResultItem';
import { Movie } from '../../domain/entities/Movie';

interface MovieSearchResultsProps {
  results: Movie[];
  loading: boolean;
  searchTerm: string;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  highlightMatch: (text: string, search: string) => React.ReactNode;
  listRef: React.RefObject<HTMLDivElement>;
  observerRef: React.RefObject<HTMLDivElement>;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({
  results,
  loading,
  searchTerm,
  selectedIndex,
  setSelectedIndex,
  highlightMatch,
  listRef,
  observerRef,
  hasMore = false,
  onLoadMore = () => {}
}) => {
  console.log('selectedIndex', selectedIndex);
  useInfiniteScroll({
    observerRef,
    hasMore,
    loading,
    onIntersect: onLoadMore
  });

  if (results.length > 0) {
    return (
      <div 
        ref={listRef}
        className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border overflow-y-auto max-h-[calc(100vh-200px)] sm:max-h-96"
      >
        {results[0] && (
          <FeaturedMovieResult
            movie={results[0]}
            searchTerm={searchTerm}
            selectedIndex={selectedIndex}
            onMouseEnter={() => setSelectedIndex(0)}
            highlightMatch={highlightMatch}
          />
        )}

        {results.slice(1).map((movie, index) => (
          <MovieResultItem
            key={movie.id}
            movie={movie}
            searchTerm={searchTerm}
            index={index}
            selectedIndex={selectedIndex}
            onMouseEnter={() => setSelectedIndex(index + 1)}
            highlightMatch={highlightMatch}
          />
        ))}
        <div ref={observerRef} className="size-8" />
      </div>
    );
  }

  if (searchTerm && !results.length && !loading) {
    return (
      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border p-4">
        <p className="text-gray-600">Nenhum resultado encontrado para <b>'{searchTerm}'</b></p>
        <div className="mt-2 space-y-2">
          <a 
            href={`https://www.imdb.com/find?q=${encodeURIComponent(searchTerm)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 hover:underline"
          >
            Buscar <b>'{searchTerm}'</b> no IMDB
          </a>
          <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 hover:underline"
          >
            Buscar <b>'{searchTerm}'</b> no Google
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default MovieSearchResults; 