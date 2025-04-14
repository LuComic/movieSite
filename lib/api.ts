import axios from 'axios';
import { MovieData } from './types';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchDataFromTMDB = async (url: string) => {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
};

export const fetchMovieData = async (title: string, type: 'Movie' | 'Series' = 'Movie'): Promise<MovieData | null> => {
  try {
    const searchEndpoint = type === 'Movie' ? 'movie' : 'tv';
    const searchResponse = await axios.get(`${BASE_URL}/search/${searchEndpoint}`, {
      params: {
        api_key: API_KEY,
        query: title,
        include_adult: false,
        sort_by: 'popularity.desc',
        page: 1,
      },
    });

    if (searchResponse.data.results.length === 0) {
      console.warn(`No ${type.toLowerCase()} found for:`, title);
      return null;
    }

    let result = searchResponse.data.results[0];
    const titleLower = title.toLowerCase();
    for (let i = 0; i < Math.min(5, searchResponse.data.results.length); i++) {
      const itemTitle = (searchResponse.data.results[i].title || searchResponse.data.results[i].name || '').toLowerCase();
      if (itemTitle === titleLower) {
        result = searchResponse.data.results[i];
        break;
      }
    }

    const id = result.id;

    const detailsEndpoint = type === 'Movie' ? 'movie' : 'tv';
    const detailsResponse = await fetchDataFromTMDB(
      `${BASE_URL}/${detailsEndpoint}/${id}?append_to_response=credits`
    );

    const movieData: MovieData = detailsResponse;

    return movieData;
  } catch (error) {
    console.error(`Error fetching ${type.toLowerCase()} data:`, error);
    return null;
  }
};

export const fetchSimilarMovies = async (id: number, type: 'Movie' | 'Series' = 'Movie'): Promise<MovieData[] | null> => {
  const endpoint = type.toLowerCase() === 'movie' ? 'movie' : 'tv';

  try {
    const searchResponse = await axios.get(`${BASE_URL}/${endpoint}/${id}/similar`, {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    });
  
    if (
      !searchResponse.data ||
      !searchResponse.data.results ||
      searchResponse.data.results.length === 0
    ) {
      console.warn('Unable to fetch similar movies or no similar movies found');
      return null;
    }

    const result = searchResponse.data;
    const similarMovies = result.results as MovieData[];

    return similarMovies.slice(0, 10);

  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return null;
  }
}

export const weeklyNews = async (): Promise<MovieData[] | null> => {
  const endpoint = 'week';

  try {
    const newsResponse = await axios.get(`${BASE_URL}/trending/all/${endpoint}`, {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    });

    if (
      !newsResponse.data ||
      !newsResponse.data.results ||
      newsResponse.data.results.length === 0
    ) {
      console.warn('Unable to fetch similar movies or no similar movies found');
      return null;
    }

    const result = newsResponse.data;
    const news = result.results as MovieData[];

    return news.slice(0, 6);

  } catch (error) {
    console.error("Problem fetching news", error);
    return null;
  }
}

export const fetchPopularMovies = async (type: 'Movie' | 'Series' = 'Movie'):Promise<MovieData[] | null> => {
  const endpoint = type.toLowerCase() === "movie" ? "movie" : "tv"
  try {
    const popularResponse = await axios.get(`${BASE_URL}/${endpoint}/popular`, {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    })
    if (
      !popularResponse.data ||
      !popularResponse.data.results ||
      popularResponse.data.results.length === 0
    ) {
      console.warn('Unable to fetch popular movies or series');
      return null;
    }

    const result = popularResponse.data;
    const popularMovies = result.results as MovieData[];

    return popularMovies.slice(0, 10);

  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
}

export const searchMovies = async (query: string, type: 'Movie' | 'Series' = 'Movie'): Promise<MovieData[] | null> => {
  const endpoint = type.toLowerCase() === "movie" ? "movie" : "tv";
  try {
    const searchResponse = await axios.get(`${BASE_URL}/search/${endpoint}`, {
      params: {
        api_key: API_KEY,
        query: query,
        page: 1,
      },
    });
    if (
      !searchResponse.data ||
      !searchResponse.data.results ||
      searchResponse.data.results.length === 0
    ) {
      console.warn('No movies or series found matching the search query');
      return null;
    }

    const result = searchResponse.data;
    const searchResults = result.results as MovieData[];

    return searchResults.slice(0, 5);

  } catch (error) {
    console.error("Error searching for movies or series:", error);
    return null;
  }
}
