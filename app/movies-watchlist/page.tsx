"use client";

import React, { useState } from "react";
import InfoModal from "../components/InfoModal";
import { WatchItem } from "@/lib/types";
import MoviePageWatchlist from "../components/MoviePageWatchlist";

const MoviesWatchlistPage = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<WatchItem | null>(null); // Store selected movie

  const openInfoModal = (movie: WatchItem) => {
    setSelectedMovie(movie); // Set the selected movie
    setInfoModalOpen(true); // Open the modal
  };

  return (
    <div className="min-h-screen">
      <MoviePageWatchlist openInfoModal={openInfoModal} />
      {isInfoModalOpen && selectedMovie && (
        <InfoModal
          closeInfoModal={() => setInfoModalOpen(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default MoviesWatchlistPage;
