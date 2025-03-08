"use client";

import React, { useState } from "react";
import Footer from "../components/Footer";
import { WatchListProvider } from "../components/WatchListInfo";
import Image from "next/image";
import Sky from "../pictures/stacked-waves-haikei-4.svg";
import InfoModal from "../components/InfoModal";
import { WatchItem } from "../components/Types";
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
