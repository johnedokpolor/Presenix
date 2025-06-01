"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const { isAuthenticated, Logout } = useStore();
  // If user is not logged in, redirect to signin page

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to signin page");
      router.push("/signin");
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await Logout();
      toast.success("Logged out successfully!");
      router.push("/signin");
    } catch (error: any) {
      console.error("Error creating account:", error);
    }
  };

  const [dark, setdark] = useState(false);
  useEffect(() => {
    if (dark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [dark]);
  return (
    <div>
      <p className="">Dashboard</p>

      <Button onClick={() => setdark(!dark)} className="bg-blue-500 text-white">
        {dark ? "Light Mode" : "Dark Mode"}
      </Button>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
