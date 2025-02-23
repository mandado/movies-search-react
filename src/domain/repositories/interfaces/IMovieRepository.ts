import { Movie } from '../../entities/Movie';

export interface SearchParams {
  query: string;
  page: number;
}

export interface SearchResult {
  results: Movie[];
  page: number;
  totalPages: number;
}

export interface IMovieRepository {
  search(params: SearchParams): Promise<SearchResult>;
} 