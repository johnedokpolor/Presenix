"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import moment from "moment";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Search, Trash } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const AttendanceListTable = ({
  attendanceLinks,
  getAll,
}: {
  attendanceLinks: any;
  getAll: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Column Definitions: Defines the columns to be displayed.

  const filteredStudents = attendanceLinks.filter((link: any) => {
    return searchTerm === ""
      ? true
      : link.name.includes(searchTerm) ||
          link.matricNumber.includes(searchTerm);
  });
  const deleteAttendanceLink = async (id: string) => {
    await axiosInstance.delete(`/users/attendancelinks/${id}`);
    getAll();
  };

  return (
    <div>
      {/* <div className="p-2 border-1 rounded-lg shadow-sm flex gap-2 max-w-sm">
        <Search />
        <input
          type="text"
          placeholder="Search on anything..."
          className="outline-none  w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      <div className="overflow-x-auto p-0  mt-3">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className=" py-3 px-4 border-1 border-gray-400 text-gray-800 font-medium text-sm dark:text-white">
                Link
              </th>
              <th className=" py-3 px-4 border-1 border-gray-400 text-nowrap text-gray-800 font-medium text-sm dark:text-white">
                Created On
              </th>
              <th className=" py-3 px-4 border-1 border-gray-400 text-nowrap text-gray-800 font-medium text-sm dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceLinks?.map((link: any, id: number) => (
              <tr key={id} className="border border-gray-400">
                <td className="py-4 px-4 text-gray-700 dark:text-white text-[13px]  border-1">
                  {link.token.slice(0, 10)}...
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-white text-[13px] border-1">
                  {moment(link.createdAt).format("MMM D, YYYY h:mm A")}
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-white text-[13px] border-1 ">
                  <Trash onClick={() => deleteAttendanceLink(link._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceListTable;
