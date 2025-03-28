"use client";

import React, { useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import backSvg from "../pictures/arrow_back_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WatchItem } from "./Types";
interface allWatchlistPageProps {
  openInfoModal: (movie: WatchItem) => void; // Update to accept a movie parameter
}

const AllWatchlist: React.FC<allWatchlistPageProps> = ({ openInfoModal }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const allWatchlist = watchList.filter((item) => item.status === "Watchlist");

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
      <h3 className="responsive-h3 text-white font-bold pb-6">Watchlist</h3>
      <div className="h-auto grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 items-start justify-center">
        {allWatchlist.length > 0 ? (
          allWatchlist.map((cinema, index) => (
            <div
              className="card card-side shadow-sm w-auto mx-auto h-full max-h-[40vh] rounded-xl overflow-y-auto cursor-pointer xl:max-w-[25vw]"
              key={index}
              onClick={() => openInfoModal(cinema)} // Open modal with movie data
            >
              <figure>
                {cinema.posterUrl ? (
                  <img
                    src={cinema.posterUrl}
                    alt={cinema.name}
                    className="w-full h-full object-cover" // Use object-cover to fill the container
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-700 animate-pulse"></div> // Loading skeleton
                )}
              </figure>
              <div className="card-body bg-gradient-to-t from-red-950 from-20% to-black p-4">
                <h2 className="card-title text-white">{cinema.name}</h2>
                <p className="text-white">{cinema.description}</p>
                <div className="card-actions justify-end">
                  {cinema.rating === 0 ? (
                    <p className="btn btn-primary bg-black/0 border-none text-white shadow-none">
                      ?/10
                    </p>
                  ) : (
                    <p className="btn btn-primary bg-black/0 border-none text-white shadow-none">
                      {cinema.rating}/10
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <li>
            <a className="text-gray-400 italic xl:text-base lg:text-sm md:text-xs sm:text-xs pr-2">
              Nothing yet
            </a>
          </li>
        )}
      </div>
    </div>
  );
};

export default AllWatchlist;
