import React from 'react'
import { useContext } from 'react';
import { WatchListInfo } from "./WatchListInfo";

const StatsPageMovies = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  return (
    <div className='flex flex-col col-span-2'>
      <h3 className='responsive-h3 text-white font-semibold'>Recent movies</h3>
      <div className="carousel carousel-center py-4 h-[60vh] rounded-xl w-auto">
        {watchList.length > 0 ? (
          watchList.map((movie, index) => (
            <div
              className="carousel-item rounded-lg mx-1"
              key={index}
            >
              <img
                className='rounded-xl'
                src={movie.posterUrl}
                alt="Cinema poster"
              />
            </div>
          ))
        ) : (
          <p className="responsive-body text-white">Emptyness...</p>
        )}
      </div>
    </div>
  )
}

export default StatsPageMovies