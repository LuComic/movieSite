import axios from 'axios';
import { MovieData } from './types'; // Import MovieData interface

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

export const fetchMovieData = async (
    title: string,
    type: 'Movie' | 'Series' = 'Movie'
): Promise<MovieData | null> => {
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

    try {
      const recommendationsResponse = await fetchDataFromTMDB(
        `${BASE_URL}/${detailsEndpoint}/${id}/recommendations`
      );
      movieData.recommendations = recommendationsResponse.results;
    } catch (error) {
      console.error(`Failed to fetch recommendations for ${type} ${title}:`, error);
      movieData.recommendations = [];
    }

    try {
      const similarResponse = await fetchDataFromTMDB(
        `${BASE_URL}/${detailsEndpoint}/${id}/similar`
      );
      movieData.similar = similarResponse.results;
    } catch (error) {
      console.error(`Failed to fetch similar movies for ${type} ${title}:`, error);
      movieData.similar = [];
    }
    return movieData;
  } catch (error) {
    console.error(`Error fetching ${type.toLowerCase()} data:`, error);
    return null;
  }
};

export const getRecommendationsForMultipleMovies = async (
    movieIds: number[]
): Promise<MovieData[]> => {
  if (!movieIds || movieIds.length === 0) {
    return [];
  }

  const allRecommendations: MovieData[] = [];
  const seenMovieIds = new Set<number>();

  for (const movieId of movieIds) {
    try {
      const response = await fetchDataFromTMDB(
        `${BASE_URL}/movie/${movieId}/recommendations`
      );
      const recommendations: MovieData[] = response.results || [];

      for (const recommendation of recommendations) {
        if (!seenMovieIds.has(recommendation.id)) {
          allRecommendations.push(recommendation);
          seenMovieIds.add(recommendation.id);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch recommendations for movie ID ${movieId}:`, error);
    }
  }
  return allRecommendations;
};