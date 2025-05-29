import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="w-screen overflow-x-hidden">
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>

      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
