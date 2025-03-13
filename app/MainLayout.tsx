// Home.tsx
"use client";

import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import Sky from "./pictures/stacked-waves-haikei-4.svg";
import Image from "next/image";
import { WatchListProvider } from "./components/WatchListInfo"; // ✅ Import the provider
import WatchModal from "./components/WatchModal";
import { useState } from "react";
import NewWatchButton from "./components/NewWatchButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <WatchListProvider>
      <main className="bg-gradient-to-b from-black from-50% to-[#ff0404] to-50% h-auto">
        <div className="absolute top-0 left-0 w-screen h-full">
          <Image src={Sky} alt="Background" fill className="object-cover" />
        </div>
        <PageHeader />
        {children}
        <NewWatchButton openModal={() => setModalOpen(true)} />
        {isModalOpen && <WatchModal closeModal={() => setModalOpen(false)} />}
        <Footer />
      </main>
    </WatchListProvider>
  );
}
