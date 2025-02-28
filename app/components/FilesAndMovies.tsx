import React from "react";
import Files from "./Files";
import Stats from "./Stats";
import RecentWatches from "./RecentWatches";
import { WatchListProvider } from "./WatchListInfo";

const FilesAndMovies = () => {
  return (
    <WatchListProvider>
      <div className="z-20 w-auto h-auto lg:grid lg:grid-cols-2 lg:grid-rows-2 sm:flex sm:flex-col">
        <Files />
        <Stats />
        <RecentWatches />
      </div>
    </WatchListProvider>
  );
};

export default FilesAndMovies;
