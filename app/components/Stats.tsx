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
  const totalMovies = watchList.filter((item) => item.type === "Movie").length;
  const totalSeries = watchList.filter((item) => item.type === "Series").length;
  const totalWatched = watchList.length; // Sum of movies and series

  // Determine the title based on total watched count
  let title = "Watch something!";
  if (totalWatched >= 1 && totalWatched <= 10) title = "Beginner Fiend";
  else if (totalWatched >= 11 && totalWatched <= 20) title = "Casual Fiend";
  else if (totalWatched >= 21 && totalWatched <= 25)
    title = "Professional Fiend";
  else if (totalWatched >= 26) title = "Get a Life";

  return (
    <div className="stats stats-vertical bg-black/60 lg:stats-horizontal shadow mb-4 border-red-600 border-2">
      <div className="stat">
        <div className="stat-title text-white flex items-center gap-2">
          <Image src={movieSvg} alt={"movie icon"} />
          Total movies
        </div>
        <div className="stat-value text-white">{totalMovies}</div>
        <div className="stat-desc text-white">All time</div>
      </div>

      <div className="stat">
        <div className="stat-title text-white flex items-center gap-2">
          <Image src={showSvg} alt={"series icon"} />
          Total series
        </div>
        <div className="stat-value text-white">{totalSeries}</div>
        <div className="stat-desc text-white">All time</div>
      </div>

      <div className="stat">
        <div className="stat-title text-white flex items-center gap-2">
          <Image src={heartSvg} alt="heart icon" />
          {title}
        </div>
        <div className="stat-value text-white">{totalWatched}</div>
        <div className="stat-desc text-white">Everything in total</div>
      </div>
    </div>
  );
};

export default Stats;
