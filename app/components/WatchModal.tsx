"use client";

import { useState, useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from "./Types";
import { fetchMovieData } from "./tmdb"; // Import the fetch function
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  closeModal: () => void;
}

const WatchModal: React.FC<ModalProps> = ({ closeModal }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("WatchInputModal must be used within a WatchListProvider");
  const { addItem } = context;

  const [form, setForm] = useState<Omit<WatchItem, "id">>({
    type: "Movie",
    status: "Watched", // Initial status
    name: "",
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

  const handleSubmit = async () => {
    if (form.name.trim()) {
      // Pass the type (Movie or Series) to fetchMovieData
      const movieData = await fetchMovieData(form.name, form.type);

      if (movieData) {
        const posterUrl = movieData.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
          : undefined;

        const releaseDate = movieData.release_date || "Unknown"; // Release date
        const genres = movieData.genres
          ? movieData.genres
              .map((genre: { name: string }) => genre.name)
              .join(", ")
          : "Unknown"; // Extract genre names

        // Fetch cast information (if available)
        const castList = movieData.credits?.cast
          ? movieData.credits.cast
              .slice(0, 5) // Get top 5 cast members
              .map((actor: { name: string }) => actor.name)
              .join(", ")
          : "Cast unavailable";

        const id = uuidv4();

        // Add the new details to the watch item
        const newItem: WatchItem = {
          ...form,
          id,
          posterUrl,
          releaseDate,
          genres,
          movieCast: castList,
        };

        addItem(newItem);
        closeModal();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50">
      <div className="modal border-2 border-red-600 rounded-xl bg-black/60 max-w-md modal-open mx-auto h-max xl:p-4 lg:p-4 p-2 my-auto flex flex-col justify-center gap-4 xl:py-6 lg:py-6 py-4">
        <h3 className="responsive-h3 text-white font-bold pb-2">
          Something new?
        </h3>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Movie or series?
        </p>
        <select
          className="select select-bordered w-full max-w-xs bg-black/0 border-1 text-white border-white focus:outline-none"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Movie" className="text-white">
            Movie
          </option>
          <option value="Series" className="text-white">
            Series
          </option>
        </select>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          What&apos;s the name?
        </p>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full max-w-xs bg-black/0 border-1 text-white border-white focus:outline-none"
        />
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Already watched or planning?
        </p>
        <select
          className="select select-bordered w-full max-w-xs bg-black/0 border-1 text-white border-white focus:outline-none"
          name="status" // Use "status" as the name
          value={form.status} // Use form.status
          onChange={handleChange} // Use handleChange
        >
          <option value="Watched">Watched</option>
          <option value="Watchlist">Watchlist/Planning</option>
        </select>
        {form.status === "Watched" && ( // Check form.status instead of selectedValue
          <>
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
          </>
        )}
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={closeModal}
            className="btn bg-slate-200 hover:bg-slate-300 text-black border-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn bg-[#ff0404] text-white hover:bg-red-700 border-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchModal;
