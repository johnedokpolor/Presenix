"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";
interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useStore();
  // If user is not logged in, redirect to signin page

  useEffect(() => {
    if (!user) {
      console.log("User is not authenticated, redirecting to signin page");
      router.push("/signin");
    }
  }, []);

  return (
    <div className="w-screen overflow-x-hidden">
      <div className="md:w-[20%]  fixed hidden md:block">
        <SideNav />
      </div>

      <div className="md:ml-[20%] md:w-[80%] ">
        <Header />
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
};

export default layout;
