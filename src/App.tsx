import React, { useRef } from 'react';
import FavoriteMovies from './application/components/FavoriteMovies';
import MovieSearchResults from './application/components/MovieSearchResults';
import { useKeyboardNavigation } from './application/hooks/useKeyboardNavigation';
import { useMovieSearch } from './domain/use-cases/useMovieSearch';
import { highlightMatch } from './utils';
import SearchInput from './application/components/SearchInput';

const MovieSearch: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    suggestedText,
    hasMore,
    loadMore
  } = useMovieSearch();

  const listRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  } = useKeyboardNavigation({
    results,
    listRef,
    searchTerm,
    setSearchTerm,
    suggestedText
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-8 py-4 sm:py-6">
        <div className="relative">
          <SearchInput
            searchRef={searchRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleKeyDown={handleKeyDown}
            suggestedText={suggestedText}
          />
          
          <MovieSearchResults
            results={results}
            loading={loading}
            searchTerm={searchTerm}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            highlightMatch={highlightMatch}
            listRef={listRef}
            observerRef={observerRef}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </div>

        <FavoriteMovies />
      </div>
    </div>
  );
};

export default MovieSearch;