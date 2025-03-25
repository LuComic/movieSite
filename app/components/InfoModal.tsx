"use client";

import { WatchItem } from "./Types";
import closeSvg from "../pictures/cancel_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";

interface ModalProps {
  closeInfoModal: () => void;
  movie: WatchItem;
}

const InfoModal: React.FC<ModalProps> = ({ closeInfoModal, movie }) => {
  const description = movie.description;

  const handleClose = () => {
    closeInfoModal();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4">
      <div className="card lg:card-side w-auto shadow-sm mx-auto my-auto rounded-xl overflow-y-auto bg-black">
        <figure className="relative aspect-auto">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className="w-[60vw] h-full xl:max-h-full xl:max-w-[80vw] lg:max-w-[80vw] md:max-w-[40vw] sm:max-w-[50vw] object-contain" // Change object-cover to object-contain
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
        <div className="card-body bg-gradient-to-t from-red-950/60 from-30% to-black/60 rounded-br-xl rounded-tl-xl w-full">
          <h3 className="responsive-h3 font-semibold text-white mb-2">
            {movie.name}
          </h3>
          <p className="text-white grow-0">{description}</p>
          <div className="my-auto">
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">
                Release:
              </p>
              <p className="text-white text-left mb-2 mt-1">{movie.releaseDate}</p>
            </div>
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">
                Genres:
              </p>
              <p className="text-white text-left mb-2 mt-1">{movie.genres}</p>
            </div>
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">Cast:</p>
              <p className="text-white text-left mb-2 mt-1">{movie.movieCast}</p>
            </div>
          </div>
          <div className="card-actions justify-end items-center">
            {movie.rating === 0 ? (
              <div className="badge badge-outline responsive-body font-semibold text-white">
                ?/5
              </div>
            ) : (
              <div className="badge badge-outline responsive-body font-semibold text-white">
                {movie.rating}/10
              </div>
            )}
            <div className="badge badge-outline responsive-body font-semibold text-white">
              {movie.type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
