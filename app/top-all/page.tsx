"use client";

import TopAllComponent from "../components/TopAll";
import { useState } from "react";
import InfoModal from "../components/InfoModal";
import { WatchItem } from "@/lib/types";
import { MovieData } from "@/lib/types";
import MovieDataModal from "../components/InfoForMovieData";

const TopAll = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<WatchItem | null>(null); // Store selected movie
  const [isMovieDataModalOpen, setMovieDataModalOpen] = useState(false);
  const [selectedDataMovie, setSelectedDataMovie] = useState<MovieData | null>(null)

  const openMovieDataModal = (movie: MovieData) => {
    setSelectedDataMovie(movie); // Set the selected movie
    setMovieDataModalOpen(true); // Open the modal
  };

  const openInfoModal = (movie: WatchItem) => {
    setSelectedMovie(movie); // Set the selected movie
    setInfoModalOpen(true); // Open the modal
  };

  return (
    <div className="min-h-screen">
      <TopAllComponent openInfoModal={openInfoModal} openMovieDataModal={openMovieDataModal} />
      {isInfoModalOpen && selectedMovie && (
        <InfoModal
          closeInfoModal={() => setInfoModalOpen(false)}
          movie={selectedMovie}
        />
      )}
      {isMovieDataModalOpen && selectedDataMovie && (
        <MovieDataModal
          closeMovieDataModal={() => setMovieDataModalOpen(false)}
          movie={selectedDataMovie}
        />
      )}
   </div>
  );
};

export default TopAll;
