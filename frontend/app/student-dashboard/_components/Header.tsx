"use client";
import React, { useState } from "react";
import useStore from "@/store/store";
import { Menu, X } from "lucide-react";
import SideNav from "./SideNav";
import UserDetails from "./UserDetails";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useStore();
  const lastname = user?.name.split(" ")[1];
  const firstname = user?.name.split(" ")[0];
  // Generate acronym from first and last name only when they are available else return empty string
  const acronym =
    (firstname?.charAt(0)?.toUpperCase() ?? "") +
    (lastname?.charAt(0)?.toUpperCase() ?? "");

  return (
    <div className="shadow-sm flex items-center fixed z-50 top-0 md:w-[80%] w-full bg-white  justify-between p-4 border">
      <div>
        <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (
            <X className="w-6 h-6  cursor-pointer" />
          ) : (
            <Menu className="w-6 h-6  cursor-pointer" />
          )}
        </button>
        {openMenu && (
          <div
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            className="fixed left-0 lg:hidden backdrop-blur-[1px] w-full top-[65px] z-50"
          >
            <SideNav />
          </div>
        )}
      </div>

      <div>{user && <UserDetails user={user} />}</div>
    </div>
  );
};

export default Header;
