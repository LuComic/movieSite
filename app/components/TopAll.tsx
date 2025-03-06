"use client";

import React, { useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import backSvg from "../pictures/arrow_back_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TopAllProps {
  openInfoModal: (movie: any) => void; // Update to accept a movie parameter
}

const TopAllComponent: React.FC<TopAllProps> = ({ openInfoModal }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative z-50 xl:px-60 lg:px-60 md:px-32 sm:px-10 px-10 py-10">
      <div
        className="flex gap-1 items-center justify-start pb-4 cursor-pointer w-max"
        onClick={handleBack}
      >
        <Image src={backSvg} alt="back icon" />
        <p className="text-white text-md hover:text-red-300">Back</p>
      </div>
      <h3 className="responsive-h3 text-white font-bold pb-6">Top All</h3>
      <div className="h-auto flex flex-col gap-4 items-start justify-center cursor-pointer">
        {watchList.length > 0 ? (
          // Sort watchList by rating in descending order and filter out items without ratings
          watchList
            .filter((movie) => movie.rating && movie.rating > 0)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .map((movie, index) => (
              <div
                className="card bg-black/60 border-2 border-red-600 rounded-box shadow-md w-full"
                key={index}
                onClick={() => openInfoModal(movie)}
              >
                <div className="card-body flex flex-row items-start">
                  <span className="text-2xl font-bold text-white mr-4 mt-1">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <h2 className="card-title responsive-body text-white font-bold">
                      {movie.name}
                    </h2>
                    <p className="responsive-body text-white font-normal my-2">
                      {movie.description}
                    </p>
                    <div className="card-actions justify-end">
                      <p className="font-bold text-white">{movie.rating}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <li>
            <a className="text-gray-400 italic xl:text-base lg:text-sm md:text-xs sm:text-xs pr-2">
              Nothing to list yet
            </a>
          </li>
        )}
      </div>
    </div>
  );
};

export default TopAllComponent;
