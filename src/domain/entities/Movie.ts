export interface MovieProps {
  id: string;
  title: string;
  year: number;
  poster: string;
  genres: string[];
  imdbUrl: string;
  isFavorite?: boolean;
}

export class Movie {
  private props: MovieProps;

  constructor(props: MovieProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get year() {
    return this.props.year;
  }

  get poster() {
    return this.props.poster;
  }

  get genres() {
    return this.props.genres;
  }

  get imdbUrl() {
    return this.props.imdbUrl;
  }

  get isFavorite() {
    return this.props.isFavorite || false;
  }

  toggleFavorite(): void {
    this.props.isFavorite = !this.props.isFavorite;
  }

  toJSON(): MovieProps {
    return this.props;
  }
} 