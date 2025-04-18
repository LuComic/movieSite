"use client";

import backSvg from "../pictures/arrow_back_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatsPageMovies from "./StatsPageMovies";
import FavouriteActors from "./FavouriteActors";
import GenreDiv from "./GenreDiv";
import { WatchItem } from "@/lib/types";
import SimilarRecommendations from "./SimilarRecommendations";
import { MovieData } from "@/lib/types";

interface moviePageProps {
  openInfoModal: (movie: WatchItem) => void; // Update to accept a movie parameter
  openMovieDataModal: (movie: MovieData) => void;
}

const TopAllComponent: React.FC<moviePageProps> = ({ openInfoModal, openMovieDataModal }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative z-30 xl:px-52 lg:px-40 md:px-28 sm:px-10 px-10 py-10">
      <div
        className="flex gap-1 items-center justify-start pb-4 cursor-pointer w-max"
        onClick={handleBack}
      >
        <Image src={backSvg} alt="back icon" />
        <p className="text-white text-md hover:text-red-300">Back</p>
      </div>
      <h3 className="responsive-h3 text-white font-bold pb-6">Stats</h3>
      <div className="h-full flex flex-col lg:grid xl:grid lg:grid-cols-3 xl:grid-cols-3 items-start gap-4 justify-start">
        <StatsPageMovies openInfoModal={openInfoModal} />
        <FavouriteActors />
        <GenreDiv />
        <SimilarRecommendations openMovieDataModal={openMovieDataModal} />
      </div>
    </div>
  );
};

export default TopAllComponent;
