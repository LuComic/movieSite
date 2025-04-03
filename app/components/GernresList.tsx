import React from 'react';
import { useContext } from 'react';
import { WatchListInfo } from "./WatchListInfo";

const GenreList = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const popularGenres: Record<string, number> = {};

  const allGenres = watchList.flatMap(cinema_thing => cinema_thing.genres?.split(", ") || [])
  allGenres.forEach(genre => {
    if (genre in popularGenres) {
      popularGenres[genre]++;
    } else {
      popularGenres[genre] = 1;
    }
  });

  const topGenres = Object.entries(popularGenres)
    .sort((a, b) => b[1] - a[1]) // Sort by occurrence (descending)
    .slice(0, 9); // Take the first 5 elements

  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th className='text-white'>Genre</th>
          <th className='text-white'>Occurrence</th>
        </tr>
      </thead>
      <tbody>
        {topGenres.length > 0 ? (
          topGenres.map(([genre, occurrence], index) => (
            <tr key={index}>
              <td className='text-white'>{genre}</td>
              <td className='text-white'>{occurrence}</td>
            </tr> 
          ))
        ) : (
          <tr>
            <td className='text-white'>No genres to show...</td>
          </tr>
        )} 
      </tbody>
    </table>
  )
}

export default GenreList