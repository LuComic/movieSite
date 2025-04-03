// FilesAndMovies.tsx
import React from "react";
import Files from "./Files";
import Stats from "./Stats";
import RecentWatches from "./RecentWatches";
import { WatchItem } from "@/lib/types";

interface FilesAndMoviesProps {
  openInfoModal: (movie: WatchItem) => void; // Pass the prop type
  openAddToWatchedModal: (movie: WatchItem) => void;
}

const FilesAndMovies: React.FC<FilesAndMoviesProps> = ({
  openInfoModal,
  openAddToWatchedModal,
}) => {
  return (
    <div className="z-20 w-auto h-auto grid lg:grid-cols-2 lg:grid-rows-2 gap-4">
      <Files
        openInfoModal={openInfoModal}
        openAddToWatchedModal={openAddToWatchedModal}
      />
      <Stats />
      <RecentWatches />
    </div>
  );
};

export default FilesAndMovies;
