import React, { useContext } from 'react';
import { WatchListInfo } from "./WatchListInfo";

const StatsPageMovies = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  // Create a copy to avoid mutating the original watchList
  const sortedWatchList = [...watchList].reverse();

  return (
    <div className='flex flex-col col-span-2'>
      <h3 className='responsive-h3 text-white font-semibold'>Recent movies</h3>
      <div className="carousel carousel-center py-4 h-[60vh] rounded-xl w-auto">
        {sortedWatchList.length > 0 ? (
          sortedWatchList.map((movie, index) => (
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
          <p className="responsive-body text-white">Emptiness...</p>
        )}
      </div>
    </div>
  )
}

export default StatsPageMovies;
