"use client";

import { useContext, useEffect, useState } from "react";
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from "./Types";
import closeSvg from "../pictures/cancel_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import movieDatabaseLogo from "../pictures/tmdb_logo.svg";
import { fetchMovieData, MovieData } from "./tmdb"; // Import the fetch function

interface ModalProps {
  closeInfoModal: () => void;
  movie: WatchItem;
}

const InfoModal: React.FC<ModalProps> = ({ closeInfoModal, movie }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("WatchInputModal must be used within a WatchListProvider");

  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const description = movie.description;
  const rating = movie.rating;
  const poster = movie.posterUrl;

  const handleClose = () => {
    closeInfoModal();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4">
      {/* TMDB Attribution */}
      <div className="fixed bottom-4 right-4 ml-auto flex-col max-w-xs max-h-xs">
        <Image
          src={movieDatabaseLogo}
          alt="tmdb logo"
          className="ml-auto w-16"
        />
        <p className="text-xs text-[#01b4e4] text-right mt-3">
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>
      <div className="card lg:card-side w-auto max-w-[70vw] max-h-[70vh] shadow-sm mx-auto my-auto rounded-xl overflow-y-auto bg-black">
        <figure className="relative flex-shrink-0 w-1/2 h-auto">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className="w-full h-auto object-contain" // Change object-cover to object-contain
            />
          ) : (
            <div className="w-full h-96 bg-gray-700 animate-pulse"></div>
          )}
        </figure>

        <Image
          src={closeSvg}
          alt="close icon"
          width={24} // Explicitly set width
          height={24} // Explicitly set height
          className="absolute top-2 left-2 bg-black/30 rounded-full p-1 cursor-pointer" // Add padding and cursor
          onClick={handleClose}
        />
        <div className="card-body bg-gradient-to-t from-red-950/60 from-30% to-black/60 rounded-br-xl rounded-tl-xl w-1/3">
          <h3 className="responsive-h3 font-semibold text-white">
            {movie.name}
          </h3>
          <p className="text-white grow-0">{description}</p>
          <div className="my-auto">
            <div>
              <p className="text-white font-semibold responsive-body">
                Release:
              </p>
              <p className="text-white text-left my-2">{movie.releaseDate}</p>
            </div>
            <div>
              <p className="text-white font-semibold responsive-body">
                Genres:
              </p>
              <p className="text-white text-left my-2">{movie.genres}</p>
            </div>
            <div>
              <p className="text-white font-semibold responsive-body">Cast:</p>
              <p className="text-white text-left my-2">{movie.movieCast}</p>
            </div>
          </div>
          <div className="card-actions justify-end items-center">
            <div className="badge badge-outline responsive-body font-semibold">
              {rating}/5
            </div>
            <div className="badge badge-outline responsive-body font-semibold">
              {movie.type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
