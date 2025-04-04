"use client";

import React, { useContext } from 'react';
import { fetchSimilarMovies } from '@/lib/api';
import { WatchListInfo } from './WatchListInfo';
import { MovieData } from '@/lib/types';

// This is a basic mapping, you might want to fetch this from an API or have a more comprehensive list
const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const getGenreNames = (genreIds: number[] | undefined): string => {
  if (!genreIds || genreIds.length === 0) {
    return '';
  }
  return genreIds
    .map(id => genreMap[id])
    .filter(name => name !== undefined)
    .join(', ');
};

const SimilarRecommendations = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const [similarMovies, setSimilarMovies] = React.useState<MovieData[] | null>(null); // Changed initial state and type

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selectedMovie = watchList.find(movie => movie.id === selectedId);
    if (selectedMovie) {
      fetchSimilarMovies(selectedId, selectedMovie.type).then((data) => {
        setSimilarMovies(data);
      });
    } else {
      setSimilarMovies(null); // Clear similar movies if no movie is selected
    }
  }

  return (
    <div className='flex flex-col h-auto col-span-3 w-full'>
      <div className='flex gap-2 items-center'>
        <h3 className='responsive-h3 text-white font-semibold'>Similar to: </h3>
        <select
          className="select select-bordered w-full cursor-pointer max-w-xs bg-black/0 border-1 text-white border-white focus:outline-none"
          name="selectedMovieId"
          onChange={handleChange}
          defaultValue="" // Added a default value
        >
          <option value="" disabled>Select a movie</option> {/* Added a default disabled option */}
          {watchList.length > 0 ? (
            watchList.map((movie, index) => (
              <option key={index} value={movie.id} className="text-white">
                {movie.name}
              </option>
            ))
          ) : (
            <option value="" disabled>Nothing to display</option>
          )}
        </select>
      </div>
      <div className="carousel carousel-center py-4 h-[60vh] rounded-xl w-auto">
        {similarMovies && similarMovies.length > 0 ? (
          similarMovies
            .filter(movie => movie.poster_path) // Filter out movies without a poster path
            .map((movie, index) => (
              <div
                className="carousel-item rounded-lg mx-1 relative cursor-pointer"
                key={index}
              >
                <img
                  className='rounded-xl w-full h-full object-cover opacity-100 hover:opacity-15 duration-250'
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'}
                  alt={movie.title}
                />
                <div className='bg-black/50 rounded-xl flex flex-col justify-end w-full h-full absolute top-0 left-0 p-4 opacity-0 hover:opacity-100 duration-250'>
                  <p className='responsive-h3 text-white font-bold'>{movie.name}</p>
                  <p className='responsive-body text-white'>{getGenreNames(movie.genre_ids)}</p>
                </div>
              </div>
            ))
        ) : (
          <p className="responsive-body text-white">Emptiness...</p>
        )}
      </div>
    </div>
  )
}

export default SimilarRecommendations