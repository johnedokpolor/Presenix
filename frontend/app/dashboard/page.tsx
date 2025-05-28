"use client";
import React, { useEffect, useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { setTheme } = useTheme();

  const [dark, setdark] = useState(false);

  useEffect(() => {
    if (dark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme, dark]);
  return (
    <div>
      <p className="">Dashboard</p>
      <Button onClick={() => setdark(!dark)} className="bg-blue-500 text-white">
        {dark ? "Light Mode" : "Dark Mode"}
      </Button>
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
};

export default Dashboard;
