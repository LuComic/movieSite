"use client";

import React, { useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import backSvg from "../pictures/arrow_back_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface allPageProps {
  openInfoModal: (movie: any) => void; // Update to accept a movie parameter
}

const AllPageAll: React.FC<allPageProps> = ({ openInfoModal }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative z-50 px-60 py-10">
      <div
        className="flex gap-1 items-center justify-start pb-4 cursor-pointer w-max"
        onClick={handleBack}
      >
        <Image src={backSvg} alt="back icon" />
        <p className="text-white text-md">Home</p>
      </div>
      <h3 className="responsive-h3 text-white font-bold pb-6">All</h3>
      <div className="h-auto grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 items-start justify-center">
        {watchList.length > 0 ? (
          watchList.map((cinema, index) => (
            <div
              className="card card-side shadow-sm w-auto max-w-[25vw] h-full max-h-[40vh] rounded-xl overflow-y-auto cursor-pointer"
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
                  <p className="btn btn-primary bg-black/0 border-none text-white shadow-none">
                    {cinema.rating}/5
                  </p>
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

export default AllPageAll;
