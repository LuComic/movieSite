import React from "react";
import Image from "next/image";
import friendsIcon from "../pictures/group_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import addIcon from "../pictures/add_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import allIcon from "../pictures/apps_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import removeFriendIcon from "../pictures/person_remove_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";

const ProfileButton = () => {
  return (
    <div className="drawer w-auto h-full bg-transparent">
      <input id="my-drawer-friends" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-friends"
          className="cursor-pointer flex items-center gap-2 text-white responsive-body font-medium hover:text-red-300 hover:bg-white/8 rounded-sm border-none p-2 transition-all duration-200"
        >
          <Image src={friendsIcon} alt={"friends icon"} />
          Friends
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-friends"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-black text-base-content border-r-2 border-red-600 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li className="flex items-center flex-row hover:bg-black/0">
            <div className="avatar hover:bg-black/0">
              <div className="w-10">
                <Image src={friendsIcon} alt={"friends icon"} />
              </div>
            </div>
            <p className="responsive-h3 font-medium cursor-default hover:bg-black/0 text-white">
              Friends
            </p>
          </li>
          <div className="mt-2 flex flex-col gap-2">
            <li>
              <a className="responsive-body hover:text-red-300 flex items-center flex-row gap-3 mb-2 text-white">
                <Image src={addIcon} alt={"add icon"} />
                Add Friend
              </a>
            </li>
            <li>
              <details className="dropdown">
                <summary className="responsive-body flex items-center flex-row gap-3 cursor-pointer text-white">
                  <div className="avatar hover:bg-black/0">
                    <div className="w-8 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  Maria
                  <div className="badge badge-soft px-3 badge-primary">
                    Out Of This World
                  </div>
                </summary>
                <ul className="menu dropdown-content bg-black border-2 border-red-600 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <a className="hover:text-red-300 text-white">
                      <Image src={allIcon} alt={"all icon"} />
                      Their Collection
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-red-300 text-white">
                      <Image
                        src={removeFriendIcon}
                        alt={"remove friend icon"}
                      />
                      Remove Friend
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="dropdown">
                <summary className="responsive-body flex items-center flex-row gap-3 cursor-pointer text-white">
                  <div className="avatar hover:bg-black/0">
                    <div className="w-8 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  Mark
                  <div className="badge badge-soft px-3 badge-success">
                    Professional Fiend
                  </div>
                </summary>
                <ul className="menu dropdown-content bg-black border-2 border-red-600 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <a className="hover:text-red-300 text-white">
                      <Image src={allIcon} alt={"all icon"} />
                      Their Collection
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-red-300 text-white">
                      <Image
                        src={removeFriendIcon}
                        alt={"remove friend icon"}
                      />
                      Remove Friend
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
