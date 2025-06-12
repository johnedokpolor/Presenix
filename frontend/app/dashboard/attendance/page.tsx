"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import AttendanceListTable from "./_components/AttendanceListTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Attendance = () => {
  const [attendanceLinks, setAttendanceLinks] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    GetAttendanceLinks();
    return () => {};
  }, []);

  const GetAttendanceLinks = async () => {
    try {
      const response = await axiosInstance.get("/users/attendancelinks");
      setAttendanceLinks(response.data.attendanceTokens);
      console.log(response.data.attendanceTokens);
    } catch (error) {
      console.error(error);
    }
  };
  const GenerateAttendanceLink = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.post("/users/attendancelinks");
      console.log(response);
      setloading(false);
      toast.success("Attendance link generated successfully!");
      GetAttendanceLinks(); // Refresh the list after generating a new link
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };
  return (
    <div className="p-5 md:p-7">
      <h2 className="font-bold text-2xl mb-5 flex items-center justify-between">
        Attendance Links
        <Button
          onClick={GenerateAttendanceLink}
          className="bg-purple-900 cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            "+ Generate Link"
          )}
        </Button>
      </h2>

      <AttendanceListTable
        attendanceLinks={attendanceLinks}
        getAll={GetAttendanceLinks}
      />
    </div>
  );
};

export default Attendance;
