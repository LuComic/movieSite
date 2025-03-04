"use client";

import React, { useContext } from "react";
import { WatchListInfo } from "./WatchListInfo";

const RecentWatches = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("RecentWatches must be used within a WatchListProvider");

  const { watchList } = context;

  const watched = watchList.filter((item) => item.status === "Watched");

  // Get the last 3 items (or less if there aren't enough)
  const recentWatches = watched.slice(-3).reverse();

  return (
    <div className="border-red-600 border-2 rounded-lg p-4 bg-black/60">
      <p className="xl:text-2xl lg:text-xl md:text-lg sm:text-base text-white font-semibold pb-2">
        Recent Watches
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="text-white"></th>
              <th className="text-white">Name</th>
              <th className="text-white">Rating</th>
              <th className="text-white">Type</th>
            </tr>
          </thead>
          <tbody>
            {recentWatches.length > 0 ? (
              recentWatches.map((item, index) => (
                <tr key={index}>
                  <th className="text-white">{index + 1}</th>
                  <td className="text-white">{item.name}</td>
                  <td className="text-white">{item.rating}/5</td>
                  <td className="text-white">{item.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-400 italic xl:text-base lg:text-sm md:text-xs sm:text-xs"
                >
                  No recent watches
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentWatches;
