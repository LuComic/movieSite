import React from 'react'
import { useContext } from 'react';
import { WatchListInfo } from "./WatchListInfo";

const FavouriteActors = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const popularActors: Record<string, number> = {};

  const allActors = watchList.flatMap(cinema_thing => cinema_thing.movieCast?.split(", ") || [])
  allActors.forEach(actor => {
    if (actor in popularActors) {
      popularActors[actor]++;
    } else {
      popularActors[actor] = 1;
    }
  });

  const topActors = Object.entries(popularActors)
    .sort((a, b) => b[1] - a[1]) // Sort by occurrence (descending)
    .slice(0, 9); // Take the first 5 elements

  return (
    <div className='flex flex-col h-full'>
      <h3 className='responsive-h3 text-white font-semibold'>Your favourite actors</h3>
      <div className="h-auto rounded-box bg-black/60 border-2 border-red-600 my-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className='text-white'>Actor</th>
              <th className='text-white'>Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {topActors.length > 0 ? (
              topActors.map(([actor, occurrence], index) => (
                <tr key={index}>
                  <td className='text-white'>{actor}</td>
                  <td className='text-white'>{occurrence}</td>
                </tr> 
              ))
            ) : (
              <tr>
                <td className='text-white'>No actors to show...</td>
              </tr>
            )} 
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FavouriteActors 