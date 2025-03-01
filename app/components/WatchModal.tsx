"use client";

import { useState, useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";
import { WatchItem } from "./Types";

interface ModalProps {
  closeModal: () => void;
}

const WatchModal: React.FC<ModalProps> = ({ closeModal }) => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("WatchInputModal must be used within a WatchListProvider");
  const { addItem } = context;

  const [form, setForm] = useState<WatchItem>({
    type: "Movie",
    name: "",
    description: "",
    rating: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (form.name.trim() && form.rating) {
      addItem(form);
      closeModal();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50">
      <div className="modal border-2 border-red-600 rounded-xl bg-black/60 max-w-md modal-open mx-auto max-h-[650px] xl:p-4 lg:p-4 p-2 my-auto flex flex-col justify-center gap-4">
        <h3 className="responsive-h3 text-white font-bold pb-2">New Watch?</h3>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Movie or series?
        </p>
        <select
          className="select select-bordered w-full max-w-xs bg-opacity-0 text-white border-white"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Movie">Movie</option>
          <option value="Series">Series</option>
        </select>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          What's the name?
        </p>
        <input
          type="text"
          name="name" // Ensure this is 'name' instead of 'text'
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full max-w-xs bg-opacity-0 text-white border-white"
        />
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Thoughts?
        </p>
        <textarea
          name="description"
          placeholder="Best thing I've ever seen..."
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full max-w-xs bg-opacity-0 text-white border-white"
        ></textarea>
        <p className="responsive-body text-white font-medium mr-auto xl:pl-12 lg:pl-12 md:pl-14 sm:pl-14 pl-14">
          Rate it 1 to 5
        </p>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs bg-opacity-0 text-white border-white"
        />
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={closeModal}
            className="btn bg-slate-300 hover:bg-slate-500 text-black border-none"
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
