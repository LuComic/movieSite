import React from "react";
import Image from "next/image";
import movieSvg from "../pictures/movie_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import showSvg from "../pictures/live_tv_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import topSvg from "../pictures/leaderboard_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import addCircle from "../pictures/add_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import allIcon from "../pictures/apps_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

interface PageHeaderProps {
  openModal: () => void; // Function passed from App to open the modal
}

const PageHeader: React.FC<PageHeaderProps> = ({ openModal }) => {
  return (
    <div className="navbar relative z-30">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="responsive-body text-white hover:text-red-300">
                <Image src={topSvg} alt={"leaderboard icon"} />
                Your top
              </a>
              <ul className="p-2">
                <li>
                  <a className="responsive-body text-white hover:text-red-300">
                    Top 5
                  </a>
                </li>
                <li>
                  <a className="responsive-body text-white hover:text-red-300">
                    Top 10
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="responsive-body text-white hover:text-red-300">
                <Image src={movieSvg} alt={"movie icon"} />
                Movies
              </a>
            </li>
            <li>
              <a className="responsive-body text-white hover:text-red-300">
                <Image src={showSvg} alt={"show svg"} />
                Series
              </a>
            </li>
            <li>
              <a className="responsive-body text-white hover:text-red-300">
                <Image src={allIcon} alt={"all icon"} />
                All
              </a>
            </li>
          </ul>
        </div>
        <a className="font-semibold responsive-h3 text-white">CinemaFreak</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2">
          <li>
            <details>
              <summary className="responsive-body font-medium text-white hover:text-red-300">
                <Image src={topSvg} alt={"leaderboard icon"} />
                Your top
              </summary>
              <ul className="p-2 bg-black">
                <li>
                  <a className="responsive-body font-light text-white hover:text-red-300">
                    Top 5
                  </a>
                </li>
                <li>
                  <a className="responsive-body font-light text-white hover:text-red-300">
                    Top 10
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a className="responsive-body font-medium text-white hover:text-red-300">
              <Image src={movieSvg} alt={"movie icon"} />
              Movies
            </a>
          </li>
          <li>
            <a className="responsive-body font-medium text-white hover:text-red-300">
              <Image src={showSvg} alt={"show svg"} />
              Series
            </a>
          </li>
          <li>
            <a className="responsive-body font-medium text-white hover:text-red-300">
              <Image src={allIcon} alt={"all icon"} />
              All
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={openModal}
          className="btn responsive-body bg-[#ff0404] hover:bg-red-700 border-none text-white"
        >
          <Image src={addCircle} alt={"add icon"} /> New
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
