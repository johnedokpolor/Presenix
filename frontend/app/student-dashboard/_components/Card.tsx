import React from "react";

interface Props {
  icon: React.ReactNode;
  value: string;
  title: string;
}
export const Card = ({ icon, value, title }: Props) => {
  return (
    <div className="flex items-center gap-5 p-7 bg-sky-100 rounded-lg shadow">
      <div className="p-2 size-10 rounded-full bg-white text-purple-900">
        {icon}
      </div>
      <div>
        <h2 className="font-bold">{title}</h2>
        <h2 className="text-lg">{value}</h2>
      </div>
    </div>
  );
};
