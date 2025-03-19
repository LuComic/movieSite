"use client";

import { useEffect, useState } from "react";

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index !== text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust the speed here
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="responsive-h3 font-bold mb-4 text-white text-center xl:text-left lg:text-left md:text-left">
      {displayedText}
    </h1>
  );
};

export default Typewriter;
