// WatchListInfo.tsx (Context)
import { createContext, useState, useEffect, ReactNode } from "react";
import { WatchItem } from "./Types";

interface WatchListContextType {
  watchList: WatchItem[];
  selectedItem: WatchItem | null;
  addItem: (item: WatchItem) => void;
  setSelectedItem: (item: WatchItem | null) => void;
  setWatchList: (watchList: WatchItem[]) => void; // Add setWatchList here
}

export const WatchListInfo = createContext<WatchListContextType | undefined>(
  undefined
);

export const WatchListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [watchList, setWatchList] = useState<WatchItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<WatchItem | null>(null);

  useEffect(() => {
    const storedList = localStorage.getItem("watchList");
    if (storedList) {
      setWatchList(JSON.parse(storedList));
    }
  }, []);

  const addItem = (item: WatchItem) => {
    const updatedList = [...watchList, item];
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };

  return (
    <WatchListInfo.Provider
      value={{
        watchList,
        selectedItem,
        addItem,
        setSelectedItem,
        setWatchList,
      }}
    >
      {children}
    </WatchListInfo.Provider>
  );
};
