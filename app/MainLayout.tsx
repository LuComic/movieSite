// Home.tsx
"use client";

import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import Sky from "./pictures/stacked-waves-haikei-4.svg";
import Image from "next/image";
import { WatchListProvider } from "./components/WatchListInfo"; // ✅ Import the provider
import WatchModal from "./components/WatchModal";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <WatchListProvider>
      <main className="bg-[#ff0404] h-auto">
        <div className="absolute top-0 left-0 w-screen h-full">
          <Image src={Sky} alt="Background" fill className="object-cover" />
        </div>
        <PageHeader openModal={() => setModalOpen(true)} />
        {isModalOpen && <WatchModal closeModal={() => setModalOpen(false)} />}
        {children}
        <Footer />
      </main>
    </WatchListProvider>
  );
}
