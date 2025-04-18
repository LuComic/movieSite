export interface MovieData {
  id: number;
  type?: 'Movie' | 'Series';
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[] | null | undefined;
  genre_ids?: number[];
  credits?: {
      cast: { name: string }[];
  };
  media_type?: 'movie' | 'tv';
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
  first_air_date?: string;
  genres?: string;
  movieCast?: string;
  avg_rating?: number;
}
