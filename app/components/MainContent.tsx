import React, { useContext, useState, useEffect } from "react";
import FilesAndMovies from "./FilesAndMovies";
import { WatchListInfo } from "./WatchListInfo"; // Import context

const MainContent = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("MainContent must be used within a WatchListProvider");

  const { watchList } = context;
  const [refreshKey, setRefreshKey] = useState(0); // Key to trigger re-render

  // Whenever watchList changes, force re-render by changing the key
  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [watchList]);

  return (
    <div className="w-screen min-h-screen h-auto py-4 flex justify-center items-center pb-20">
      <FilesAndMovies key={refreshKey} />
      {/* FilesAndMovies will re-render when key changes */}
    </div>
  );
};

export default MainContent;
