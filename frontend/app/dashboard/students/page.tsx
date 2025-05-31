import React from "react";
import AddNewStudent from "./_components/AddNewStudent";

const Students = () => {
  return (
    <div className="p-7 flex items-center justify-between">
      <h2 className="font-bold text-2xl">Students</h2>
      <AddNewStudent />
    </div>
  );
};

export default Students;
