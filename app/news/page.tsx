"use client";

import React, { useState } from "react";
import AllNews from "../components/News";
import MovieDataModal from "../components/InfoForMovieData";
import { MovieData } from "@/lib/types";


const News = () => {
  const [isMovieDataModalOpen, setMovieDataModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);

  const openMovieDataModal = (movie: MovieData) => {
    setSelectedMovie(movie); // Set the selected movie
    setMovieDataModalOpen(true); // Open the modal
  };

  return (
    <div className="min-h-screen">
      <AllNews openMovieDataModal={openMovieDataModal} />
      {isMovieDataModalOpen && selectedMovie && (
        <MovieDataModal
          closeMovieDataModal={() => setMovieDataModalOpen(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default News;
