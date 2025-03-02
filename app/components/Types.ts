export interface WatchItem {
  type: "Movie" | "Series";
  name: string;
  description: string;
  rating: number;
  posterUrl?: string; // Add this line
  releaseDate?: string; // Add release date
  genres?: string; // Add genres
  movieCast?: string; // Add cast
}
