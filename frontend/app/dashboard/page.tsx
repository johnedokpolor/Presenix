"use client";
import React, { useEffect, useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { setTheme } = useTheme();

  const [dark, setdark] = useState(false);

  useEffect(() => {
    // sets the theme to dark or light based on the state
    dark ? setTheme("dark") : setTheme("light");
  }, [dark]);
  return (
    <div>
      <p className="">Dashboard</p>
      <Button onClick={() => setdark(!dark)} className="bg-blue-500 text-white">
        {dark ? "Light Mode" : "Dark Mode"}
      </Button>
      <LogoutLink>Lo kkg out</LogoutLink>
    </div>
  );
};

export default Dashboard;
