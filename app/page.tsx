// Home.tsx
"use client";

import PageHeader from "./components/PageHeader";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Sky from "./pictures/stacked-waves-haikei-4.svg";
import Image from "next/image";
import { WatchListProvider } from "./components/WatchListInfo"; // ✅ Import the provider
import WatchModal from "./components/WatchModal";
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
    <WatchListProvider>
      <main className="bg-[#ff0404] h-auto">
        <div className="absolute top-0 left-0 w-screen h-full">
          <Image src={Sky} alt="Background" fill className="object-cover" />
        </div>
        <PageHeader openModal={() => setModalOpen(true)} />
        {isModalOpen && <WatchModal closeModal={() => setModalOpen(false)} />}
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
        <Footer />
      </main>
    </WatchListProvider>
  );
}
