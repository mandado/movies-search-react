export interface TMDBResponse {
  results: Array<{
    id: number;
    title: string;
    release_date?: string;
    poster_path?: string;
    genre_ids: number[];
    imdb_id?: string;
  }>;
  page: number;
  total_pages: number;
} 