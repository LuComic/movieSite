"use client";

import { MovieData } from "@/lib/types";
import closeSvg from "../pictures/cancel_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";

interface ModalProps {
  closeMovieDataModal: () => void;
  movie: MovieData;
}

// This is a basic mapping, you might want to fetch this from an API or have a more comprehensive list
const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const getGenreNames = (genreIds: number[] | undefined, genres?: { id: number; name: string }[] | null | undefined): string => {
  if (genres && Array.isArray(genres)) {
    return genres.map(genre => genre.name).join(', ');
  }
  
  if (!genreIds || genreIds.length === 0) {
    return '';
  }
  return genreIds
    .map(id => genreMap[id])
    .filter(name => name !== undefined)
    .join(', ');
};

const getActors = (credits: { cast?: { name: string }[] } | undefined): string => {
  if (!credits || !credits.cast || credits.cast.length === 0) {
    return 'No cast information available';
  }

  return credits.cast
    .slice(0, 5)
    .map(actor => actor.name)
    .join(', ');
}

const MovieDataModal: React.FC<ModalProps> = ({ closeMovieDataModal, movie }) => {

  const handleClose = () => {
    closeMovieDataModal();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4">
      <div className="card lg:card-side w-auto shadow-sm mx-auto my-auto rounded-xl overflow-y-auto bg-black">
        <figure className="relative aspect-auto">
          {movie.poster_path ? (
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'}
              alt={movie.title}
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
          <h3 className="responsive-h3 font-semibold text-white">
            {movie.title || movie.name || "Unknown"}
          </h3>
          <div className="my-auto">
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">
                Release:
              </p>
                <p className="text-white text-left mb-2 mt-1">{movie.release_date || movie.first_air_date || "Unknown"}</p>
            </div>
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">
                Genres:
              </p>
              <p className="text-white text-left mb-2 mt-1">{getGenreNames(movie.genre_ids, movie.genres)}</p>
            </div>
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">Cast:</p>
              <p className="text-white text-left mb-2 mt-1">{getActors(movie.credits) || "unknown"}</p>
            </div>
            <div className="mb-3">
              <p className="text-white font-semibold responsive-body">Average user rating:</p>
              <p className="text-white text-left mb-2 mt-1">{movie.vote_average}</p>
            </div>
          </div>
          <div className="card-actions justify-end items-center">
            <div className="badge badge-outline responsive-body font-semibold bg-transparent text-white">
              {movie.type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDataModal;
