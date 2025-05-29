"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const Logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully!");
      router.push("/signin");
      console.log(response.data);
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

      <Button onClick={Logout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
