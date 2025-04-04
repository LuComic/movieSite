import React, { useContext } from 'react';
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from '@/lib/types';

interface moviePageProps {
  openInfoModal: (movie: WatchItem) => void; // Update to accept a movie parameter
}

const StatsPageMovies: React.FC<moviePageProps> = ({ openInfoModal }) => {
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
              className="carousel-item rounded-lg mx-1 relative cursor-pointer"
              key={index}
              onClick={() => openInfoModal(movie)}
            >
              <img
                className='rounded-xl w-full h-full object-cover opacity-100 hover:opacity-15 duration-250'
                src={movie.posterUrl}
                alt="Cinema poster"
              />
              <div className='bg-black/50 rounded-xl flex flex-col justify-end w-full h-full absolute top-0 left-0 p-4 opacity-0 hover:opacity-100 duration-250'>
                <p className='responsive-h3 text-white font-bold'>{movie.name}</p>
                <p className='responsive-body text-white'>{movie.genres}</p>
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

export default StatsPageMovies;
