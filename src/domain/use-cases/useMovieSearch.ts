import { useState, useEffect, useRef, useCallback } from 'react';
import { useTMDB } from '../../application/contexts/TMDBContext';
import { Movie } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export function useMovieSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [suggestedText, setSuggestedText] = useState<string>('');
  const [previousSearch, setPreviousSearch] = useState<string>('');
  const abortController = useRef<AbortController | null>(null);
  
  const tmdb = useTMDB();
  const movieRepository = new MovieRepository(tmdb);

  const fetchMovies = async (pageNum: number = page): Promise<void> => {
    if (!searchTerm) {
      setSuggestedText('');
      setResults([]);
      return;
    }

    if (pageNum > 1 && !hasMore) return;

    setLoading(true);
    
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();

    try {
      const { results, page, totalPages } = await movieRepository.search({
        query: searchTerm,
        page: pageNum
      });

      setResults(prev => pageNum === 1 ? results : [...prev, ...results]);
      setHasMore(page < totalPages);
      
      if (results.length > 0 && pageNum === 1) {
        setSuggestedText(results[0].title);
      } else {
        setSuggestedText('');
      }
    } catch (error) {
      setSuggestedText('');
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error fetching movies:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        setPage(1);
        fetchMovies(1);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  }, [loading, hasMore, page]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    hasMore,
    page,
    setPage,
    fetchMovies,
    suggestedText,
    previousSearch,
    setPreviousSearch,
    loadMore
  };
} 