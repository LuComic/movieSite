import React, { useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from "./Types"; // Assuming Types is the file with the WatchItem type
import WatchDetailsModal from "./WatchDetailsModal"; // Make sure the import path is correct

const WatchList: React.FC = () => {
  // Explicitly type the context value to match WatchListContextType
  const context = useContext(WatchListInfo);

  // Ensure context is defined, otherwise, provide default values or handle error
  if (!context) {
    throw new Error("WatchListInfo context is not available");
  }

  const { watchList, selectedItem, setSelectedItem } = context;

  const handleItemClick = (item: WatchItem) => {
    setSelectedItem(item); // Set the clicked item to the context
  };

  const closeModal = () => {
    setSelectedItem(null); // Close modal by resetting selectedItem to null
  };

  return (
    <div>
      <ul>
        {watchList.map((item) => (
          <li
            key={item.name}
            className="cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            {item.name} ({item.type})
          </li>
        ))}
      </ul>

      {/* Show modal if selectedItem is set */}
      {selectedItem && (
        <WatchDetailsModal item={selectedItem} closeModal={closeModal} />
      )}
    </div>
  );
};

export default WatchList;
