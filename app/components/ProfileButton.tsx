import React from "react";
import Image from "next/image";
import infoIcon from "../pictures/info_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import termsIcon from "../pictures/gavel_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import privacyIcon from "../pictures/admin_panel_settings_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import signoutIcon from "../pictures/logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";

const ProfileButton = () => {
  return (
    <div className="drawer w-auto h-full">
      <input id="my-drawer-profile" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-profile" className="cursor-pointer">
          <div className="avatar">
            <div className="w-8 lg:w-10 xl:w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-profile"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-black text-base-content border-r-2 border-red-600 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li className="flex items-center flex-row hover:bg-black/0">
            <div className="avatar hover:bg-black/0">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="flex flex-col gap-2 hover:bg-black/0">
              <p className="responsive-h3 font-medium cursor-default text-white">
                John Doe
              </p>
              <div className="badge badge-soft px-3 badge-error cursor-default">
                Beginner Fiend
              </div>
            </div>
          </li>
          <div className="mt-5 flex flex-col gap-2">
            <li>
              <a className="responsive-body hover:text-red-300 flex items-center flex-row gap-3 text-white">
                <Image src={infoIcon} alt="info icon" />
                Profile details
              </a>
            </li>
            <li>
              <a className="responsive-body hover:text-red-300 flex items-center flex-row gap-3 text-white">
                <Image src={termsIcon} alt="terms icon" />
                Terms and Conditions
              </a>
            </li>
            <li>
              <a className="responsive-body hover:text-red-300 flex items-center flex-row gap-3 text-white">
                <Image src={privacyIcon} alt="privacy icon" />
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="responsive-body hover:text-red-300 flex items-center flex-row gap-3 text-white">
                <Image src={signoutIcon} alt="signout icon" />
                Sign out
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
