"use client";

import React, { useContext } from "react";
import Image from "next/image";
import movieSvg from "../pictures/movie_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import showSvg from "../pictures/live_tv_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { WatchListInfo } from "./WatchListInfo";
import deleteSvg from "../pictures/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

const Files = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList, setWatchList } = context;

  // Separate movies and series
  const movies = watchList.filter((item) => item.type === "Movie");
  const series = watchList.filter((item) => item.type === "Series");

  // Function to handle deleting an item
  const handleDelete = (itemToDelete: any) => {
    // Filter out the item to be deleted
    const updatedList = watchList.filter((item) => item !== itemToDelete);

    // Update the context state
    setWatchList(updatedList);

    // Also update localStorage
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };

  return (
    <ul className="menu xl:menu-lg lg:menu-md md:menu-sm sm:menu-xs bg-black/60 rounded-lg w-full max-w-xs row-span-2 mx-auto border-red-600 border-2 mb-4 xl:mb-0 lg:mb-0">
      <li>
        <details open>
          <summary className="text-white font-bold hover:text-red-300">
            <Image src={movieSvg} alt={"movie icon"} />
            Movies
          </summary>
          <ul>
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center justify-start"
                >
                  <li>
                    <a className="text-white hover:text-red-300">
                      {movie.name}
                    </a>
                  </li>
                  <Image
                    src={deleteSvg}
                    alt="delete svg"
                    className="bg-red-700 rounded-full p-1 cursor-pointer hover:bg-red-800"
                    onClick={() => handleDelete(movie)} // Delete movie on click
                  />
                </div>
              ))
            ) : (
              <li className="text-gray-400 italic">No movies yet</li>
            )}
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary className="text-white font-bold hover:text-red-300">
            <Image src={showSvg} alt={"series icon"} />
            Series
          </summary>
          <ul>
            {series.length > 0 ? (
              series.map((show, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center justify-start"
                >
                  <li>
                    <a className="text-white hover:text-red-300">{show.name}</a>
                  </li>
                  <Image
                    src={deleteSvg}
                    alt="delete svg"
                    className="bg-red-700 rounded-full p-1 cursor-pointer hover:bg-red-800"
                    onClick={() => handleDelete(show)} // Delete series on click
                  />
                </div>
              ))
            ) : (
              <li className="text-gray-400 italic">No series yet</li>
            )}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default Files;
