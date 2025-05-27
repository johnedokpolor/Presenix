"use client";
import { menuList } from "@/utils/data";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const SideNav = () => {
  const { user } = useKindeBrowserClient();

  const acronym = `${user?.given_name?.slice(0, 1)}${user?.family_name?.slice(
    0,
    1
  )}`;
  return (
    <div className="shadow-md border h-screen p-5">
      <h1 className="font-bold text-2xl">Presenza</h1>
      <hr className="my-5" />
      {menuList.map((menu, index) => (
        <h2
          className="flex items-center gap-3 text-lg p-4 my-2 duration-500 text-slate-900 dark:text-slate-100 hover:bg-purple-900 hover:text-white cursor-pointer rounded-lg"
          key={index}
        >
          <menu.icon />
          {menu.name}
        </h2>
      ))}
      {user && (
        <div className="flex fixed items-center gap-2 p-4 bottom-5">
          <div className="bg-purple-900 text-white size-10 flex justify-center items-center  text-xl rounded-full">
            {acronym}
          </div>
          <div>
            <h2 className="font-bold text-sm">
              {user?.given_name} {user?.family_name}
            </h2>
            <h2 className="text-xs text-slate-800">{user?.email}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
