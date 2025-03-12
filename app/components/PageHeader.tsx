"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import movieSvg from "../pictures/movie_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import showSvg from "../pictures/live_tv_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import topSvg from "../pictures/leaderboard_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import allIcon from "../pictures/apps_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Link from "next/link";
import ProfileButton from "./ProfileButton";
import FriendsButton from "./FriendsButton";

const PageHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const detailsRefs = useRef<Array<HTMLDetailsElement | null>>([]);

  const handleClickOutside = (event: MouseEvent) => {
    // Handle mobile dropdown
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }

    // Handle desktop dropdowns
    detailsRefs.current.forEach((details) => {
      if (details && !details.contains(event.target as Node)) {
        details.removeAttribute("open");
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add click handler for links to close dropdowns
  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    detailsRefs.current.forEach((details) => {
      if (details) {
        details.removeAttribute("open");
      }
    });
  };

  return (
    <div className="navbar relative z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden bg-black/0 border-none shadow-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow-sm"
          >
            <li>
              <a className="responsive-body text-white hover:text-red-300 font-medium">
                <Image src={topSvg} alt={"leaderboard icon"} />
                Your rankings
              </a>
              <ul className="p-2">
                <li>
                  <Link
                    href="../top-3"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Top 3s
                  </Link>
                </li>
                <li>
                  <Link
                    href="../top-all"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    All rankings
                  </Link>
                </li>
              </ul>
              <a className="responsive-body text-white hover:text-red-300 font-medium">
                <Image src={movieSvg} alt={"movie icon"} />
                Movies
              </a>
              <ul className="p-2">
                <li>
                  <Link
                    href="../movies-watched"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Watched
                  </Link>
                </li>
                <li>
                  <Link
                    href="../movies-watchlist"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="../movies"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    All
                  </Link>
                </li>
              </ul>
              <a className="responsive-body text-white hover:text-red-300 font-medium">
                <Image src={showSvg} alt={"show icon"} />
                Series
              </a>
              <ul className="p-2">
                <li>
                  <Link
                    href="../series-watched"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Watched
                  </Link>
                </li>
                <li>
                  <Link
                    href="../series-watchlist"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="../series"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    All
                  </Link>
                </li>
              </ul>
              <a className="responsive-body text-white hover:text-red-300 font-medium">
                <Image src={allIcon} alt={"all icon"} />
                All
              </a>
              <ul className="p-2">
                <li>
                  <Link
                    href="../all-watched"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Watched
                  </Link>
                </li>
                <li>
                  <Link
                    href="../all-watchlist"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="../all"
                    className="responsive-body text-white font-light hover:text-red-300"
                  >
                    All
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Link href="/" className="font-semibold responsive-h3 text-white">
          StreamList
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2">
          <li>
            <details
              ref={(el: HTMLDetailsElement | null) => {
                detailsRefs.current[0] = el;
              }}
            >
              <summary className="responsive-body font-medium text-white hover:text-red-300">
                <Image src={topSvg} alt={"leaderboard icon"} />
                Your rankings
              </summary>
              <ul className="p-2 bg-black">
                <li>
                  <Link
                    href="../top-3"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Top 3s
                  </Link>
                </li>
                <li>
                  <Link
                    href="../top-all"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    All rankings
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details
              ref={(el: HTMLDetailsElement | null) => {
                detailsRefs.current[1] = el;
              }}
            >
              <summary className="responsive-body font-medium text-white hover:text-red-300">
                <Image src={movieSvg} alt={"movie icon"} />
                Movies
              </summary>
              <ul className="p-2 bg-black">
                <li>
                  <Link
                    href="../movies-watched"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Watched
                  </Link>
                </li>
                <li>
                  <Link
                    href="../movies-watchlist"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="../movies"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    All
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details
              ref={(el: HTMLDetailsElement | null) => {
                detailsRefs.current[2] = el;
              }}
            >
              <summary className="responsive-body font-medium text-white hover:text-red-300">
                <Image src={showSvg} alt={"show icon"} />
                Series
              </summary>
              <ul className="p-2 bg-black">
                <li>
                  <Link
                    href="../series-watched"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Watched
                  </Link>
                </li>
                <li>
                  <Link
                    href="../series-watchlist"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="../series"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    All
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details
              ref={(el: HTMLDetailsElement | null) => {
                detailsRefs.current[3] = el;
              }}
            >
              <summary className="responsive-body font-medium text-white hover:text-red-300">
                <Image src={allIcon} alt={"all icon"} />
                All
              </summary>
              <ul className="p-2 bg-black">
                <li>
                  <Link
                    href="../all-watched"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Watched
                  </Link>
                </li>
                <li>
                  <Link
                    href="../all-watchlist"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="../all"
                    className="responsive-body font-light text-white hover:text-red-300"
                    onClick={handleLinkClick}
                  >
                    All
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-5">
        <FriendsButton />
        <ProfileButton />
      </div>
    </div>
  );
};

export default PageHeader;
