export interface WatchItem {
  id: string; // Add this line
  type: "Movie" | "Series";
  status: "Watched" | "Watchlist";
  name: string;
  description?: string;
  rating: 0;
  posterUrl?: string; // Add this line
  releaseDate?: string; // Add release date
  genres?: string; // Add genres
  movieCast?: string; // Add cast
}
