export interface MovieData {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[] | null | undefined;
  credits?: {
      cast: { name: string }[];
  };
  recommendations?: MovieData[];
  similar?: MovieData[];
}

export interface WatchItem {
  id: number;
  type: 'Movie' | 'Series';
  status: 'Watched' | 'Watchlist';
  name: string;
  description?: string;
  rating: number;
  posterUrl?: string;
  releaseDate?: string;
  genres?: string;
  movieCast?: string;
  recommendations?: MovieData[];
  similar?: MovieData[];
}
