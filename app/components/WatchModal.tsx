"use client";

import { useState, useContext, useEffect } from "react";
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from "@/lib/types";
import { fetchMovieData, searchMovies } from "@/lib/api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import searchIcon from "../pictures/Material Icon Search.svg";
import { MovieData } from "@/lib/types";

interface ModalProps {
  closeModal: () => void;
}

const WatchModal: React.FC<ModalProps> = ({ closeModal }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("WatchInputModal must be used within a WatchListProvider");

  const { addItem } = context;
  const { watchList } = context;

  const [form, setForm] = useState<Omit<WatchItem, "id">>({
    type: "Movie",
    status: "Watched", // Initial status
    name: "",
    rating: 0,
  });

  const [searchResults, setSearchResults] = useState<MovieData[] | null>(null);
  const [, setError] = useState<string | null>(null); // Error message
  // Clear error state on component mount and unmount
  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

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
    setError(null);
  };

  const findMovie = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, name: value }));
  };

  const handleSearch = async () => {
    if (form.name.length >= 2) {
      try {
        const results = await searchMovies(form.name, form.type);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setSearchResults(null);
      }
    }
  };

  const handleResultClick = (movie: MovieData) => {
    setForm(prev => ({
      ...prev,
      name: movie.title || movie.name || "",
    }));
    setSearchResults(null);
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
    if (form.name.trim() && !watchList.some(item => item.name.toLocaleLowerCase() === form.name.trim().toLocaleLowerCase())) {
      // Pass the type (Movie or Series) to fetchMovieData
      const movieData = await fetchMovieData(form.name, form.type);

      if (movieData) {
        const posterUrl = movieData.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
          : undefined;

        const releaseDate = movieData.release_date || "Unknown"; // Release date


        if (movieData.genres && Array.isArray(movieData.genres)) {
          movieData.genres.forEach((genre, index) => {
            console.log("Genre " + index + ":", genre);
          });
        }

        const avg_rating = movieData.vote_average;

        const genres = movieData.genres
          ? Array.isArray(movieData.genres)
            ? movieData.genres
              .map((genre: { name: string }) => genre.name)
              .join(", ")
            : "Unknown"
          : "Unknown"; // Extract genre names

        // Fetch cast information (if available)
        const castList = movieData.credits?.cast
          ? movieData.credits.cast
            .slice(0, 5) // Get top 5 cast members
            .map((actor: { name: string }) => actor.name)
            .join(", ")
          : "Cast unavailable";

        const id = movieData.id;

        // Add the new details to the watch item
        const newItem: WatchItem = {
          ...form,
          id,
          posterUrl,
          releaseDate,
          genres,
          avg_rating,
          movieCast: castList,
        };

        addItem(newItem);
        closeModal();
        setError(null);
      }
    } else {
      const errorMessage = `Either the ${form.type} is already added, rating is 0 or name is invalid`;
      setError(errorMessage);
      toast.error(errorMessage);    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50" onClick={() => setSearchResults(null)}>
      <div className="modal border-2 border-red-600 rounded-xl bg-black/60 max-w-md modal-open mx-auto h-max xl:p-4 lg:p-4 p-2 my-auto flex flex-col justify-center gap-4 xl:py-6 lg:py-6 py-4">
        <h3 className="responsive-h3 text-white font-bold pb-2">
          Something new?
        </h3>
        <p className="responsive-body text-white font-medium w-full max-w-xs">
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
        <p className="responsive-body text-white font-medium w-full max-w-xs">
          Search
        </p>
        <div className="relative flex w-full max-w-xs items-center gap-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={findMovie}
            placeholder="Title"
            className="input input-bordered w-full bg-black/0 border-1 text-white border-white focus:outline-none"
          />
          <button 
            onClick={handleSearch}
            className="btn btn-square bg-transparent border-white hover:bg-white/10"
          >
            <img src={searchIcon.src} alt="Search" className="w-5 h-5" />
          </button>
        </div>
        {searchResults && searchResults.length > 0 && (
          <div className="absolute top-[40%] z-50 w-[80%] mx-auto bg-black border-2 border-white rounded-lg p-2 max-h-60 overflow-y-auto">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleResultClick(movie)}
                className="p-2 cursor-pointer text-white rounded-md hover:text-red-300 duration-200"
              >
                {movie.title || movie.name} - {movie.release_date}
              </div>
            ))}
          </div>
        )}
        <p className="responsive-body text-white font-medium w-full max-w-xs">
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
            <p className="responsive-body text-white font-medium w-full max-w-xs">
              Thoughts?
            </p>
            <textarea
              name="description"
              placeholder="Best thing I've ever seen..."
              value={form.description}
              onChange={handleChange}
              className="textarea textarea-bordered border-1 w-full bg-black/0 max-w-xs text-white border-white focus:outline-none"
            ></textarea>
            <p className="responsive-body text-white font-medium w-full max-w-xs">
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
        <div className="flex justify-between gap-4 mt-2">
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
      <Toaster richColors />
    </div>
  );
};

export default WatchModal;
