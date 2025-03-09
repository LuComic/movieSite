"use client";

import { useState, useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from "./Types";

interface AddToWatchedProps {
  closeAddToWatchedModal: () => void;
  movie: WatchItem;
}

const AddToWatchedModal: React.FC<AddToWatchedProps> = ({
  closeAddToWatchedModal,
  movie,
}) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("WatchInputModal must be used within a WatchListProvider");

  const { watchList, setWatchList } = context;

  const [form, setForm] = useState<WatchItem>({
    ...movie,
    status: "Watched",
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value, // Handle rating as a number
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value > 10) {
      // If value is greater than 10, set it to 10
      handleChange({
        ...e,
        target: { ...e.target, value: "10", name: "rating" },
      });
    } else {
      handleChange(e);
    }
  };

  const handleSubmit = () => {
    // Create updated watchlist with the modified movie
    const updatedWatchList = watchList.map((item) =>
      // Compare by name and type instead of direct object comparison
      item.name === movie.name && item.type === movie.type ? { ...form } : item
    );

    // Update the context state
    setWatchList(updatedWatchList);

    // Update localStorage
    localStorage.setItem("watchList", JSON.stringify(updatedWatchList));

    // Close the modal
    closeAddToWatchedModal();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50">
      <div className="modal border-2 border-red-600 rounded-xl bg-black/60 max-w-md modal-open mx-auto max-h-[60vh] xl:p-4 lg:p-4 p-2 my-auto flex flex-col justify-center gap-4">
        <h3 className="responsive-h3 text-white font-bold pb-2">
          Add to watched
        </h3>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Thoughts?
        </p>
        <textarea
          name="description"
          placeholder="Best thing I've ever seen..."
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered border-1 w-full bg-black/0 max-w-xs text-white border-white focus:outline-none"
        ></textarea>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Rate it 1 to 10
        </p>
        <input
          name="rating"
          type="number"
          min="1"
          max="10"
          placeholder="Rating (1-10)"
          value={form.rating === 0 ? "" : form.rating}
          step={0.1}
          onChange={handleRatingChange}
          className="input input-bordered w-full max-w-xs bg-black/0 text-white border-1 border-white focus:outline-none"
        />
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={closeAddToWatchedModal}
            className="btn bg-slate-200 hover:bg-slate-300 text-black border-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn bg-[#ff0404] text-white hover:bg-red-700 border-none"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToWatchedModal;
