// FilesAndMovies.tsx
import React from "react";
import Files from "./Files";
import Stats from "./Stats";
import RecentWatches from "./RecentWatches";
import { WatchListProvider } from "./WatchListInfo";

interface FilesAndMoviesProps {
  openInfoModal: (movie: any) => void; // Pass the prop type
}

const FilesAndMovies: React.FC<FilesAndMoviesProps> = ({ openInfoModal }) => {
  return (
    <WatchListProvider>
      <div className="z-20 w-auto h-auto grid lg:grid-cols-2 lg:grid-rows-2 gap-4">
        <Files openInfoModal={openInfoModal} />
        <Stats />
        <RecentWatches />
      </div>
    </WatchListProvider>
  );
};

export default FilesAndMovies;
