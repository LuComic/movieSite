// utils/tmdb.ts
import axios from "axios";

const API_KEY = "be510a38a2a3e31f1a0cef3e845479ac"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

export interface MovieData {
  id: number;
  title: string;
  overview: string;
  poster_path: string; // This is the thumbnail/poster path
  vote_average: number; // Movie rating
}

export const fetchMovieData = async (
  movieName: string
): Promise<MovieData | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: movieName,
      },
    });

    // Return the first result (most relevant movie)
    if (response.data.results.length > 0) {
      return response.data.results[0];
    } else {
      return null; // No movie found
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};
