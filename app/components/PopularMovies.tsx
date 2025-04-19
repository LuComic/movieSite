"use client";

import React, { useState, useEffect } from 'react';
import { MovieData } from '@/lib/types';
import { fetchPopularMovies } from '@/lib/api';

interface PopularMoviesProps {
  openMovieDataModal: (movie: MovieData) => void;
}

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

const getGenreNames = (genreIds: number[] | undefined, genres?: { id: number; name: string }[] | null | undefined): string => {
  if (genres && Array.isArray(genres)) {
    return genres.map(genre => genre.name).join(', ');
  }
  
  if (!genreIds || genreIds.length === 0) {
    return '';
  }
  return genreIds
    .map(id => genreMap[id])
    .filter(name => name !== undefined)
    .join(', ');
};

const PopularMovies: React.FC<PopularMoviesProps> = ({ openMovieDataModal }) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const result = await fetchPopularMovies("Movie");
        setMovies(result || []);
      } catch (error) {
        console.error("Error loading popular movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className='flex flex-col h-auto col-span-3 w-full'>
      <h3 className='responsive-h3 text-white font-semibold'>Popular Movies</h3>
      <div className="carousel carousel-center py-4 h-[60vh] rounded-xl w-auto">
        {loading ? (
          <p className="responsive-body text-white">Loading...</p>
        ) : movies.length > 0 ? (
            movies.filter(movie => movie.poster_path).map((movie, index) => (
              <div
                className="carousel-item rounded-lg mx-1 relative cursor-pointer"
                key={index}
                onClick={() => openMovieDataModal(movie)}
              >
                <img
                  className='rounded-xl w-full h-full object-cover opacity-100 hover:opacity-15 duration-250'
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'}
                  alt={movie.title}
                />
                <div className='bg-black/50 rounded-xl flex flex-col justify-end w-full h-full absolute top-0 left-0 p-4 opacity-0 hover:opacity-100 duration-250'>
                  <p className='responsive-h3 text-white font-bold'>{movie.title}</p>
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

export default PopularMovies