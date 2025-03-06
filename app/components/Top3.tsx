"use client";

import React, { useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import backSvg from "../pictures/arrow_back_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WatchItem } from "./Types";

interface Top3Props {
  openInfoModal: (movie: WatchItem) => void;
}

const Top3Component: React.FC<Top3Props> = ({ openInfoModal }) => {
  const context = useContext(WatchListInfo);
  if (!context) throw new Error("Top3 must be used within a WatchListProvider");
  const { watchList } = context;

  // Get top 3 for each category
  const getTop3 = (items: WatchItem[]) => {
    return items
      .filter((item) => item.rating && item.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  };

  const topMovies = getTop3(watchList.filter((item) => item.type === "Movie"));
  const topSeries = getTop3(watchList.filter((item) => item.type === "Series"));
  const topOverall = getTop3(watchList);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative z-30 xl:px-60 lg:px-60 md:px-32 sm:px-10 px-10 py-10">
      <div
        className="flex gap-1 items-center justify-start pb-4 cursor-pointer w-max"
        onClick={handleBack}
      >
        <Image src={backSvg} alt="back icon" />
        <p className="text-white text-md hover:text-red-300">Back</p>
      </div>
      <h3 className="responsive-h3 text-white font-bold pb-6">Top 3s</h3>

      {/* Movies List - only show if there are movies */}
      {topMovies.length > 0 && (
        <ul className="list bg-black/60 border-2 border-red-600 rounded-box shadow-md mb-8">
          <li className="p-4 pb-2 responsive-h3 text-white font-medium tracking-wide">
            Your favourite movies
          </li>
          {topMovies.map((movie, index) => (
            <li
              key={index}
              className="list-row cursor-pointer items-center"
              onClick={() => openInfoModal(movie)}
            >
              <div className="responsive-h3 text-white font-semibold tabular-nums">
                #{index + 1}
              </div>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={movie.posterUrl}
                  alt={movie.name}
                />
              </div>
              <div className="list-col-grow responsive-body text-white font-semibold">
                <div>{movie.name}</div>
                <div className="responsive-body text-white font-normal">
                  {movie.description || "No description"}
                </div>
              </div>
              <p className="font-bold text-white">{movie.rating}/10</p>
            </li>
          ))}
        </ul>
      )}

      {/* Series List - only show if there are series */}
      {topSeries.length > 0 && (
        <ul className="list bg-black/60 border-2 border-red-600 rounded-box shadow-md mb-8">
          <li className="p-4 pb-2 responsive-h3 text-white font-medium tracking-wide">
            Your favourite series
          </li>
          {topSeries.map((series, index) => (
            <li
              key={index}
              className="list-row cursor-pointer items-center"
              onClick={() => openInfoModal(series)}
            >
              <div className="responsive-h3 text-white font-semibold tabular-nums">
                #{index + 1}
              </div>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={series.posterUrl}
                  alt={series.name}
                />
              </div>
              <div className="list-col-grow responsive-body text-white font-semibold">
                <div>{series.name}</div>
                <div className="responsive-body text-white font-normal">
                  {series.description || "No description"}
                </div>
              </div>
              <p className="font-bold text-white">{series.rating}/10</p>
            </li>
          ))}
        </ul>
      )}

      {/* Overall List - only show if there are items */}
      {topOverall.length > 0 && (
        <ul className="list bg-black/60 border-2 border-red-600 rounded-box shadow-md">
          <li className="p-4 pb-2 responsive-h3 text-white font-medium tracking-wide">
            Your all-time favourites
          </li>
          {topOverall.map((item, index) => (
            <li
              key={index}
              className="list-row cursor-pointer items-center"
              onClick={() => openInfoModal(item)}
            >
              <div className="responsive-h3 text-white font-semibold tabular-nums">
                #{index + 1}
              </div>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={item.posterUrl}
                  alt={item.name}
                />
              </div>
              <div className="list-col-grow responsive-body text-white font-semibold">
                <div>{item.name}</div>
                <div className="responsive-body text-white font-normal">
                  {item.description || "No description"}
                </div>
              </div>
              <p className="font-bold text-white">{item.rating}/10</p>
            </li>
          ))}
        </ul>
      )}

      {/* Show message if no lists are available */}
      {topMovies.length === 0 &&
        topSeries.length === 0 &&
        topOverall.length === 0 && (
          <p className="text-gray-400 italic text-center">No rated items yet</p>
        )}
    </div>
  );
};

export default Top3Component;
