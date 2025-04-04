import axios from 'axios';
import { MovieData } from './types';

const API_KEY = "be510a38a2a3e31f1a0cef3e845479ac";
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