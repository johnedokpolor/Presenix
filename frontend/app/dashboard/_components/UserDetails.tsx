/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useStore from "@/store/store";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserDetails = () => {
  const router = useRouter();
  const { student, lecturer, Logout } = useStore();
  const user = student ? student : lecturer;
  const [details, setdetails] = useState(false);

  const handleLogout = async () => {
    try {
      await Logout();
      toast.success("Logged out successfully!");
      router.push("/signin");
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="group relative md:cursor-pointer">
      <div
        onClick={() => setdetails(!details)}
        className="relative text-xl bottom-[5px] mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-900 text-white"
      >
        {user.name.slice(0, 1)}
      </div>
      {details && (
        <div className="absolute right-0 z-[50] mt-3 w-[300px] flex-col items-center rounded-xl bg-gray-200 p-3 shadow-lg  dark:bg-[#1f1f1f] md:w-[400px]">
          <p className="text-center text-lg">{user.email}</p>
          <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900 text-white">
            {user.name.slice(0, 1)}
          </div>

          <p className="mt-3">Hi, {user.name}!</p>
          <button
            onClick={handleLogout}
            className="cursor-pointer mx-auto mt-4 rounded-md border border-gray-500 bg-transparent p-3 text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
