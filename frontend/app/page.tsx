"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  useEffect(() => {
    redirect("/login");
  }, []);
  return <div></div>;
};

export default Page;
