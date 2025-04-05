"use client";

import React, { useState, useEffect } from "react";
import { weeklyNews } from "@/lib/api";
import { MovieData } from "@/lib/types";

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


const WeeklyNews = () => {
  const [trendingNews, setTrendingNews] = useState<MovieData[] | null>(null);
  let topTrending = null;

  useEffect(() => {
    const fetchWeeklyData = async () => {
      const news = await weeklyNews();
      setTrendingNews(news);
    };

    fetchWeeklyData();

    // A week
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const intervalId = setInterval(fetchWeeklyData, oneWeek);

    return () => clearInterval(intervalId);
  }, []);

  if (trendingNews && trendingNews.length > 0) {
    topTrending = trendingNews[0];
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <div className="h-auto flex flex-col lg:grid xl:grid lg:grid-cols-2 xl:grid-cols-2 items-start gap-4 justify-start">
        {topTrending ? (
          <div>
            <h3 className='responsive-h3 text-white font-semibold'>Top trending this week!</h3>
            <div className="card card-side bg-black/60 border-2 my-4 h-[60vh] w-auto border-red-600">
              <figure>
                <img
                  src={topTrending.poster_path ? `https://image.tmdb.org/t/p/w500${topTrending.poster_path}` : '/placeholder.png'}
                  alt="Movie"
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body flex flex-col gap-4">
                <p className="max-h-max responsive-h3 font-bold text-white">{topTrending.title}</p>
                <p className="max-h-max responsive-body text-white">{getGenreNames(topTrending.genre_ids)}</p>
              </div>
            </div>
          </div>
          ) : (
            <p className="responsive-body text-white">No trending movies</p>
          )}
        <div className="flex flex-col">
          <h3 className='responsive-h3 text-white font-semibold'>Others trending this week</h3>
          <div className="carousel carousel-center my-4 h-[60vh] rounded-xl w-auto">
            {trendingNews && trendingNews.length > 0 ? (
              trendingNews.slice(1).map((movie, index) => (
                <div
                  className="carousel-item rounded-lg mx-1 relative cursor-pointer"
                  key={index}
                >
                  <img
                    className='rounded-xl w-full h-full object-cover opacity-100 hover:opacity-15 duration-250'
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Cinema poster"
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
      </div>
    </div>
  );
};

export default WeeklyNews;