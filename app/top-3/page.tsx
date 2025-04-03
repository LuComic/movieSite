"use client";

import React, { useState } from "react";
import InfoModal from "../components/InfoModal";
import { WatchItem } from "@/lib/types";
import Top3Component from "../components/Top3";

const Top3 = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<WatchItem | null>(null); // Store selected movie

  const openInfoModal = (movie: WatchItem) => {
    setSelectedMovie(movie); // Set the selected movie
    setInfoModalOpen(true); // Open the modal
  };

  return (
    <div className="min-h-screen">
      <Top3Component openInfoModal={openInfoModal} />
      {isInfoModalOpen && selectedMovie && (
        <InfoModal
          closeInfoModal={() => setInfoModalOpen(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default Top3;
