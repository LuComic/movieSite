"use client";

import React, { useContext } from "react";
import movieSvg from "../pictures/movie_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import showSvg from "../pictures/live_tv_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import heartSvg from "../pictures/favorite_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import { WatchListInfo } from "./WatchListInfo";

const Stats: React.FC = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("WatchList must be used within a WatchListProvider");
  const { watchList } = context;

  // Calculate stats dynamically
  const totalWatched = watchList.filter(
    (item) => item.status === "Watched"
  ).length; // Sum of movies and series
  // Separate movies and series
  const movies = watchList.filter((item) => item.type === "Movie");
  const series = watchList.filter((item) => item.type === "Series");

  const watchedMovies = movies.filter(
    (item) => item.status === "Watched"
  ).length;
  const watchedSeries = series.filter(
    (item) => item.status === "Watched"
  ).length;

  // Determine the title based on total watched count
  let title = "Beginner Fiend";
  if (totalWatched >= 0 && totalWatched <= 10) title = "Beginner Fiend";
  else if (totalWatched >= 11 && totalWatched <= 20) title = "Casual Fiend";
  else if (totalWatched >= 21 && totalWatched <= 25)
    title = "Professional Fiend";
  else if (totalWatched >= 26) title = "Out Of This World";

  return (
    <div className="stats stats-vertical bg-black/60 lg:stats-horizontal shadow-sm border-red-600 border-2">
      <div className="stat">
        <div className="stat-title text-white flex items-center gap-2">
          <Image src={movieSvg} alt={"movie icon"} />
          Total movies
        </div>
        <div className="stat-value text-white">{watchedMovies}</div>
        <div className="stat-desc text-white">All time</div>
      </div>

      <div className="stat">
        <div className="stat-title text-white flex items-center gap-2">
          <Image src={showSvg} alt={"series icon"} />
          Total series
        </div>
        <div className="stat-value text-white">{watchedSeries}</div>
        <div className="stat-desc text-white">All time</div>
      </div>

      <div className="stat">
        <div className="stat-title text-white flex items-center gap-2">
          <Image src={heartSvg} alt="heart icon" />
          <div className="text-error text-md bg-black/40 rounded-md px-3 py-1 cursor-default">
            {title}
          </div>
        </div>
        <div className="stat-value text-white">{totalWatched}</div>
        <div className="stat-desc text-white">Everything in total</div>
      </div>
    </div>
  );
};

export default Stats;
