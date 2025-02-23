import { Movie, MovieProps } from '../entities/Movie';
import { IMovieRepository, SearchParams, SearchResult } from './interfaces/IMovieRepository';
import { HttpClient, FetchHttpClient } from '../../infrastructure/http/fetch';
import { TMDBContextData } from "../../application/contexts/TMDBContext";
import { TMDBResponse } from '../../types';

export class MovieRepository implements IMovieRepository {
  private readonly httpClient: HttpClient;
  private baseUrl: string;

  constructor(config?: TMDBContextData) {
    this.httpClient = new FetchHttpClient(config);
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  async search({ query, page = 1 }: SearchParams): Promise<SearchResult> {
    try {
      const url = `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&page=${page}`;
      const data = await this.httpClient.get<TMDBResponse>(url);
      
      return {
        results: data.results.map(this.mapToMovie),
        page: data.page,
        totalPages: data.total_pages
      };
    } catch (error) {
      throw new Error('Falha ao buscar filmes');
    }
  }

  private mapToMovie(data: any): Movie {
    const movieProps: MovieProps = {
      id: data.id.toString(),
      title: data.title,
      year: new Date(data.release_date).getFullYear(),
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      genres: data.genres?.map((genre: any) => genre.name) || [],
      imdbUrl: `https://www.imdb.com/title/${data.imdb_id}`,
    };

    return new Movie(movieProps);
  }
} 