import React from 'react';
import GenreChart from './GenreChart';
import GenreList from './GernresList';

const GenreDiv = () => {
  return (
    <div className='flex flex-col h-full col-span-3 w-full'>
      <h3 className='responsive-h3 text-white font-semibold'>Your 10 favourite genres</h3>
      <div className="h-auto rounded-box flex flex-col lg:flex-row xl:flex-row items-center justify-center bg-black/60 border-2 border-red-600 my-4">
        <GenreChart />
        <GenreList />
     </div>
    </div>
  )
}

export default GenreDiv