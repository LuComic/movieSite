// Files.tsx
import React, { useContext } from "react";
import Image from "next/image";
import movieSvg from "../pictures/movie_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import showSvg from "../pictures/live_tv_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { WatchListInfo } from "./WatchListInfo";
import deleteSvg from "../pictures/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { WatchItem } from "./Types"; // Import the WatchItem type
import eyeOpen from "../pictures/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeClosed from "../pictures/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

interface FilesProps {
  openInfoModal: (movie: WatchItem) => void; // Define the prop type
  openAddToWatchedModal: (movie: WatchItem) => void;
}

const Files: React.FC<FilesProps> = ({
  openInfoModal,
  openAddToWatchedModal,
}) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList, setWatchList } = context;

  // Separate movies and series
  const movies = watchList.filter((item) => item.type === "Movie");
  const series = watchList.filter((item) => item.type === "Series");

  const watchedMovies = movies.filter((item) => item.status === "Watched");
  const watclistMovies = movies.filter((item) => item.status === "Watchlist");

  const watchedSeries = series.filter((item) => item.status === "Watched");
  const watchlistSeries = series.filter((item) => item.status === "Watchlist");

  const handleDelete = (itemToDelete: WatchItem) => {
    // Filter using name and type comparison
    const updatedList = watchList.filter(
      (item) =>
        !(item.name === itemToDelete.name && item.type === itemToDelete.type)
    );

    // Log for debugging
    console.log("Before delete - watchList:", watchList);
    console.log("Item to delete:", itemToDelete);
    console.log("After delete - updatedList:", updatedList);

    // Update both state and localStorage synchronously
    setWatchList([...updatedList]); // Create new array reference
    localStorage.setItem("watchList", JSON.stringify(updatedList));
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
            <li>
              <details>
                <summary className="text-white hover:text-red-300 mb-1 lg:text-base md:text-sm sm:text-xs">
                  <Image src={eyeOpen} alt="open eye icon" />
                  Watched
                </summary>
                <ul>
                  {watchedMovies.length > 0 ? (
                    watchedMovies.map((movie, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center justify-start"
                      >
                        <li className="ml-5">
                          <a
                            className="text-white hover:text-red-300 xl:text-base lg:text-base md:text-sm sm:text-xs cursor-pointer"
                            onClick={() => openInfoModal(movie)} // Open modal with movie data
                          >
                            {movie.name}
                          </a>
                        </li>
                        <Image
                          src={deleteSvg}
                          alt="delete svg"
                          className="bg-red-700 rounded-sm p-1 cursor-pointer hover:bg-red-800"
                          onClick={() => handleDelete(movie)} // Delete movie on click
                        />
                      </div>
                    ))
                  ) : (
                    <li>
                      <a className="text-gray-400 italic xl:text-base mb-1 lg:text-sm md:text-xs sm:text-xs">
                        No watched movies yet
                      </a>
                    </li>
                  )}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="text-white hover:text-red-300 mb-1 lg:text-base md:text-sm sm:text-xs">
                  <Image src={eyeClosed} alt="open eye icon" />
                  Watchlist
                </summary>
                <ul>
                  {watclistMovies.length > 0 ? (
                    watclistMovies.map((movie, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center justify-start"
                      >
                        <li className="ml-5">
                          <a
                            className="text-white hover:text-red-300 xl:text-base lg:text-base md:text-sm sm:text-xs cursor-pointer"
                            onClick={() => openInfoModal(movie)} // Open modal with movie data
                          >
                            {movie.name}
                          </a>
                        </li>
                        <Image
                          src={eyeOpen}
                          alt="add to watched icon"
                          className="bg-amber-500 rounded-sm p-1 cursor-pointer hover:bg-amber-600"
                          onClick={() => openAddToWatchedModal(movie)}
                        />
                        <Image
                          src={deleteSvg}
                          alt="delete icon"
                          className="bg-red-700 rounded-sm p-1 cursor-pointer hover:bg-red-800"
                          onClick={() => handleDelete(movie)} // Delete movie on click
                        />
                      </div>
                    ))
                  ) : (
                    <li>
                      <a className="text-gray-400 italic xl:text-base mb-1 lg:text-sm md:text-xs sm:text-xs">
                        Your watchlist is empty
                      </a>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary className="text-white font-bold hover:text-red-300 mb-1 lg:text-base md:text-sm sm:text-xs">
            <Image src={showSvg} alt={"show icon"} />
            Series
          </summary>
          <ul>
            <li>
              <details>
                <summary className="text-white hover:text-red-300 mb-1 lg:text-base md:text-sm sm:text-xs">
                  <Image src={eyeOpen} alt="open eye icon" />
                  Watched
                </summary>
                <ul>
                  {watchedSeries.length > 0 ? (
                    watchedSeries.map((movie, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center justify-start"
                      >
                        <li className="ml-5">
                          <a
                            className="text-white hover:text-red-300 xl:text-base lg:text-base md:text-sm sm:text-xs cursor-pointer"
                            onClick={() => openInfoModal(movie)} // Open modal with movie data
                          >
                            {movie.name}
                          </a>
                        </li>
                        <Image
                          src={deleteSvg}
                          alt="delete svg"
                          className="bg-red-700 rounded-sm p-1 cursor-pointer hover:bg-red-800"
                          onClick={() => handleDelete(movie)} // Delete movie on click
                        />
                      </div>
                    ))
                  ) : (
                    <li>
                      <a className="text-gray-400 italic xl:text-base mb-1 lg:text-sm md:text-xs sm:text-xs">
                        No watched series yet
                      </a>
                    </li>
                  )}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="text-white hover:text-red-300 mb-1 lg:text-base md:text-sm sm:text-xs">
                  <Image src={eyeClosed} alt="open eye icon" />
                  Watchlist
                </summary>
                <ul>
                  {watchlistSeries.length > 0 ? (
                    watchlistSeries.map((movie, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center justify-start"
                      >
                        <li className="ml-5">
                          <a
                            className="text-white hover:text-red-300 xl:text-base lg:text-base md:text-sm sm:text-xs cursor-pointer"
                            onClick={() => openInfoModal(movie)} // Open modal with movie data
                          >
                            {movie.name}
                          </a>
                        </li>
                        <Image
                          src={eyeOpen}
                          alt="add to watched icon"
                          className="bg-amber-500 rounded-sm p-1 cursor-pointer hover:bg-amber-600"
                          onClick={() => openAddToWatchedModal(movie)}
                        />
                        <Image
                          src={deleteSvg}
                          alt="delete svg"
                          className="bg-red-700 rounded-sm p-1 cursor-pointer hover:bg-red-800"
                          onClick={() => handleDelete(movie)} // Delete movie on click
                        />
                      </div>
                    ))
                  ) : (
                    <li>
                      <a className="text-gray-400 italic xl:text-base mb-1 lg:text-sm md:text-xs sm:text-xs">
                        Your watchlist is empty
                      </a>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default Files;
