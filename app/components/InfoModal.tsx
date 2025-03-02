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

  useEffect(() => {
    // Fetch movie data when the modal opens
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      const data = await fetchMovieData(movie.name);
      setMovieData(data);
      setIsLoading(false); // Stop loading
    };

    fetchData();
  }, [movie.name]);

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
          className="ml-auto w-20"
        />
        <p className="text-xs text-[#01b4e4] text-right mt-3">
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>

      {/* Modal Content */}
      <div className="card max-w-3xl max-h-[80vh] shadow-sm mx-auto my-auto rounded-xl overflow-y-auto bg-black">
        <figure className="relative w-full h-96">
          {" "}
          {/* Fixed height for the image container */}
          {/* Movie Poster */}
          {isLoading ? (
            <div className="w-full h-96 bg-gray-700 animate-pulse"></div> // Loading skeleton
          ) : (
            movieData?.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movie.name}
                className="w-full h-full object-cover" // Use object-cover to fill the container
              />
            )
          )}
          {/* Close Button */}
          <Image
            src={closeSvg}
            alt="close icon"
            className="absolute top-2 right-2 rounded-full cursor-pointer bg-black/30 p-1"
            onClick={handleClose}
          />
        </figure>

        {/* Movie Details */}
        <div className="card-body bg-gradient-to-t from-red-950/60 from-30% to-black/60 rounded-xl">
          <h2 className="card-title text-white">{movie.name}</h2>
          <p className="text-white">
            {description} {/* Use TMDb overview if available */}
          </p>
          <div className="card-actions justify-end items-center">
            <div className="badge badge-outline">
              {rating}
              /5
            </div>
            <div className="badge badge-outline">{movie.type}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
