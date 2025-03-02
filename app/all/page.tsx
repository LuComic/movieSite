"use client";

import React, { useState } from "react";
import Footer from "../components/Footer";
import { WatchListProvider } from "../components/WatchListInfo";
import Image from "next/image";
import Sky from "../pictures/stacked-waves-haikei-4.svg";
import InfoModal from "../components/InfoModal";
import { WatchItem } from "../components/Types";
import AllPageAll from "../components/AllPageAll";

const moviePage = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<WatchItem | null>(null); // Store selected movie

  const openInfoModal = (movie: WatchItem) => {
    setSelectedMovie(movie); // Set the selected movie
    setInfoModalOpen(true); // Open the modal
  };

  return (
    <WatchListProvider>
      <main className="bg-[#ff0404] h-auto">
        <div className="min-h-screen">
          <div className="absolute top-0 left-0 w-screen h-full">
            <Image src={Sky} alt="Background" fill className="object-cover" />
          </div>
          <AllPageAll openInfoModal={openInfoModal} />
          {isInfoModalOpen && selectedMovie && (
            <InfoModal
              closeInfoModal={() => setInfoModalOpen(false)}
              movie={selectedMovie}
            />
          )}
        </div>
        <Footer />
      </main>
    </WatchListProvider>
  );
};

export default moviePage;
