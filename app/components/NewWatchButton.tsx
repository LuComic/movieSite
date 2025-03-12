import React from "react";
import Image from "next/image";
import AddCircle from "../pictures/add_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

interface NewWatchButtonProps {
  openModal: () => void; // Function passed from App to open the modal
}

const NewWatchButton: React.FC<NewWatchButtonProps> = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className="btn responsive-body bg-black/70 hover:bg-black/80 text-white border-none rounded-full absolute bottom-4 right-4"
    >
      <Image src={AddCircle} alt={"add icon"} /> New
    </button>
  );
};

export default NewWatchButton;
