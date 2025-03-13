import axios from "axios";

const API_KEY = "be510a38a2a3e31f1a0cef3e845479ac"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

export interface MovieData {
  id: number;
  title?: string;
  name?: string; // For TV shows
  overview: string;
  poster_path?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string; // For TV shows
  genres?: { id: number; name: string }[]; // Genres as an array
  credits?: {
    cast: { name: string }[]; // Cast names
  };
}

export const fetchMovieData = async (
  title: string,
  type: "Movie" | "Series" = "Movie"
): Promise<MovieData | null> => {
  try {
    // Select search endpoint based on type
    const searchEndpoint = type === "Movie" ? "movie" : "tv";

    // Search for the movie/show with higher result limit
    const searchResponse = await axios.get(
      `${BASE_URL}/search/${searchEndpoint}`,
      {
        params: {
          api_key: API_KEY,
          query: title,
          include_adult: false, // Filter out adult content
          sort_by: "popularity.desc", // Sort by popularity to get the most relevant result
          page: 1,
        },
      }
    );

    if (searchResponse.data.results.length === 0) {
      console.warn(`No ${type.toLowerCase()} found for:`, title);
      return null;
    }

    // Look through first few results for exact title match (case insensitive)
    let result = searchResponse.data.results[0]; // Default to first result
    const titleLower = title.toLowerCase();

    // Try to find better match in first 5 results
    for (let i = 0; i < Math.min(5, searchResponse.data.results.length); i++) {
      const item = searchResponse.data.results[i];
      const itemTitle = (item.title || item.name || "").toLowerCase();

      // If we find an exact match, use it
      if (itemTitle === titleLower) {
        result = item;
        break;
      }
    }

    const id = result.id;

    // Fetch full details based on type
    const detailsEndpoint = type === "Movie" ? "movie" : "tv";
    const detailsResponse = await axios.get(
      `${BASE_URL}/${detailsEndpoint}/${id}`,
      {
        params: {
          api_key: API_KEY,
          append_to_response: "credits", // Fetch cast details
        },
      }
    );

    return detailsResponse.data;
  } catch (error) {
    console.error(`Error fetching ${type.toLowerCase()} data:`, error);
    return null;
  }
};
