"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const Header = () => {
  const { user } = useKindeBrowserClient();
  const acronym = `${user?.given_name?.slice(0, 1)}${user?.family_name?.slice(
    0,
    1
  )}`;

  return (
    <div className="shadow-sm flex justify-between p-4 border">
      <div></div>

      <div>
        <div className="bg-purple-900 text-white size-10 flex justify-center items-center  text-xl rounded-full">
          {acronym}
        </div>
      </div>
    </div>
  );
};

export default Header;
