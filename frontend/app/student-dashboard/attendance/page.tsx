/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import AttendanceListTable from "./_components/AttendanceListTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useStore from "@/store/store";

const Attendance = () => {
  const { user, SetUser } = useStore();

  const [attendanceLinks, setAttendanceLinks] = useState([]);
  const [loading, setloading] = useState(false);
  const classesAttended = attendanceLinks.filter((link: any) =>
    link.studentsPresent?.some(
      (student: any) => student.matricNumber === user.matricNumber
    )
  );
  const classesMissed = attendanceLinks.filter(
    (link: any) =>
      !link.studentsPresent?.some(
        (student: any) => student.matricNumber === user.matricNumber
      )
  );

  useEffect(() => {
    GetAttendanceLinks();
    MarkAttendance();
  }, []);

  const GetAttendanceLinks = async () => {
    try {
      const response = await axiosInstance.get("/users/attendancelinks");
      setAttendanceLinks(response.data.attendanceTokens);
    } catch (error) {
      console.error(error);
    }
  };
  const MarkAttendance = async () => {
    setloading(true);
    try {
      const { data } = await axiosInstance.get("/users/mark-attendance");
      toast.success("You have been marked present for this class");
      setloading(false);
    } catch (error) {
      console.error(error);
      toast.error("Token expired, marked as absent");
      setloading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div>
            <h2 className="text-lg font-medium mt-3">Marking Attendance...</h2>
          </div>
        </div>
      ) : (
        <div className="pb-5 px-5 pt-2 md:pb-7 md:px-7 md:pt-2">
          <AttendanceListTable
            attendanceLinks={classesAttended}
            getAll={GetAttendanceLinks}
          />
          <AttendanceListTable
            attendanceLinks={classesMissed}
            getAll={GetAttendanceLinks}
            isMissed={true}
          />
        </div>
      )}
    </>
  );
};

export default Attendance;
