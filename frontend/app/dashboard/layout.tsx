import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
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
