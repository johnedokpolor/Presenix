"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Search } from "lucide-react";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface Student {
  name: string;
  matricNumber: string;
  attendanceNo: string;
}

interface StudentListTableProps {
  students: Student[];
  attendanceLinks: any;
}

const StudentListTable: React.FC<StudentListTableProps> = ({
  students,
  attendanceLinks,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Column Definitions: Defines the columns to be displayed.

  const filteredStudents = students.filter((student: any) => {
    return searchTerm === ""
      ? true
      : student.name.includes(searchTerm) ||
          student.matricNumber.includes(searchTerm);
  });

  return (
    <div>
      <div className="p-2 border-1 rounded-lg shadow-sm flex gap-2 max-w-sm">
        <Search />
        <input
          type="text"
          placeholder="Search on anything..."
          className="outline-none  w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto p-0  mt-3">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className=" py-3 px-4 border-1 border-gray-400 text-gray-800 font-medium text-sm dark:text-white">
                Student Name
              </th>
              <th className=" py-3 px-4 border-1 border-gray-400 text-nowrap text-gray-800 font-medium text-sm dark:text-white">
                Matric Number
              </th>
              <th className=" py-3 px-4 border-1 border-gray-400 text-nowrap text-gray-800 font-medium text-sm dark:text-white">
                Class Attended
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents?.map((student, id) => (
              <tr key={id} className="border border-gray-400">
                <td className="my-4 mx-4 text-gray-700 dark:text-white text-[13px] line-clamp-1 overflow-hidden">
                  {student.name}
                </td>
                <td className="py-3 px-4 border border-gray-400">
                  <span
                    className={`px-2 py-1 text-xs rounded text-nowrap inline-block `}
                  >
                    {student.matricNumber}
                  </span>
                </td>
                <td className="py-3 px-4 border border-gray-400">
                  <span
                    className={`px-2 py-1 text-xs rounded text-nowrap inline-block `}
                  >
                    {`${student.attendanceNo} out of  ${attendanceLinks.length}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListTable;
