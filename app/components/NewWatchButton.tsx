"use client";

import React from "react";
import Image from "next/image";
import addIcon from "../pictures/add_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

interface NewWatchButtonProps {
  openModal: () => void;
}

const NewWatchButton: React.FC<NewWatchButtonProps> = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className="fixed bottom-8 right-8 z-40 bg-black/70 text-white font-semibold px-4 py-2 rounded-full hover:bg-black/80 transition-colors duration-200 shadow-lg cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Image src={addIcon} alt="Add icon" />
        <span>New</span>
      </div>
    </button>
  );
};

export default NewWatchButton;
