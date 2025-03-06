// Home.tsx
"use client";

import MainContent from "./components/MainContent";
import { useState } from "react";
import InfoModal from "./components/InfoModal";
import { WatchItem } from "./components/Types"; // Import the WatchItem type
import AddToWatchedModal from "./components/AddToWatched";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isAddToWatchedModalOpen, setAddToWatchedModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<WatchItem | null>(null);

  const openInfoModal = (movie: WatchItem) => {
    setSelectedMovie(movie); // Set the selected movie
    setInfoModalOpen(true); // Open the modal
  };

  const openAddToWatchedModal = (movie: WatchItem) => {
    setSelectedMovie(movie);
    setAddToWatchedModalOpen(true);
  };

  return (
    <>
      <MainContent
        openInfoModal={openInfoModal}
        openAddToWatchedModal={openAddToWatchedModal}
      />
      {isAddToWatchedModalOpen && selectedMovie && (
        <AddToWatchedModal
          closeAddToWatchedModal={() => setAddToWatchedModalOpen(false)}
          movie={selectedMovie}
        />
      )}
      {isInfoModalOpen && selectedMovie && (
        <InfoModal
          closeInfoModal={() => setInfoModalOpen(false)}
          movie={selectedMovie}
        />
      )}
    </>
  );
}
