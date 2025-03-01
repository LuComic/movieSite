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

  const handleDelete = (itemToDelete: any) => {
    // Create a new list that excludes the deleted item by filtering it out
    const updatedList = watchList.filter((item) => item !== itemToDelete);

    // Update the context state by passing the new list reference
    setWatchList(updatedList); // No need to spread the array again

    // Immediately update localStorage with the new list to ensure it reflects the deletion
    localStorage.setItem("watchList", JSON.stringify(updatedList));
    window.location.reload();
  };

  return (
    <ul className="menu pb-3 h-full xl:menu-lg lg:menu-md md:menu-sm sm:menu-xs bg-black/60 rounded-lg w-full max-w-lg row-span-2 mx-auto border-red-600 border-2">
      <li>
        <details open>
          <summary className="text-white font-bold hover:text-red-300 mb-1 lg:text-base md:text-sm sm:text-xs">
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
                    <a className="text-white hover:text-red-300 xl:text-base lg:text-base md:text-sm sm:text-xs">
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
              <li>
                <a className="text-gray-400 italic xl:text-base lg:text-sm md:text-xs sm:text-xs pr-2">
                  No movies yet
                </a>
              </li>
            )}
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary className="text-white font-bold hover:text-red-300 mt-2 mb-1 lg:text-base md:text-sm sm:text-xs">
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
              <li>
                <a className="text-gray-400 italic xl:text-base lg:text-sm md:text-xs sm:text-xs pr-2">
                  No series yet
                </a>
              </li>
            )}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default Files;
