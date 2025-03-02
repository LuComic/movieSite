import axios from "axios";

const API_KEY = "be510a38a2a3e31f1a0cef3e845479ac"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

export interface MovieData {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  vote_average: number;
  release_date?: string;
  genres?: { id: number; name: string }[]; // Genres as an array
  credits?: {
    cast: { name: string }[]; // Cast names
  };
}

export const fetchMovieData = async (
  movieName: string
): Promise<MovieData | null> => {
  try {
    // Step 1: Search for the movie
    const searchResponse = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: movieName,
      },
    });

    if (searchResponse.data.results.length === 0) {
      console.warn("No movie found for:", movieName);
      return null;
    }

    // Get the first matching movie's ID
    const movieId = searchResponse.data.results[0].id;

    // Step 2: Fetch full movie details, including genres and cast
    const detailsResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "credits", // Fetch cast details
      },
    });

    console.log("Fetched movie data:", detailsResponse.data); // Debugging

    return detailsResponse.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};
