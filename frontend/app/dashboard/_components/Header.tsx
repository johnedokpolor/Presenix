"use client";
import React from "react";
import useStore from "@/store/store";

const Header = () => {
  const { lecturer, student } = useStore();
  const user = lecturer ? lecturer : student;
  const lastname = user?.name.split(" ")[1];
  const firstname = user?.name.split(" ")[0];
  // Generate acronym from first and last name only when they are available else return empty string
  const acronym =
    (firstname?.charAt(0)?.toUpperCase() ?? "") +
    (lastname?.charAt(0)?.toUpperCase() ?? "");

  return (
    <div className="shadow-sm flex justify-between p-4 border">
      <div></div>

      <div>
        {acronym && (
          <div className="bg-purple-900 text-white size-10 flex justify-center items-center  text-xl rounded-full">
            {acronym}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
