/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import AttendanceListTable from "./_components/AttendanceListTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useStore from "@/store/store";
import { Hand } from "lucide-react";

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
    // MarkAttendance();
    GetAttendanceLinks();
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
      GetAttendanceLinks();

      console.log(data);
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
      <div className="pb-5 px-5 pt-2 md:pb-7 md:px-7 md:pt-2">
        <div className="flex w-full justify-end">
          <Button
            onClick={MarkAttendance}
            className="bg-purple-900 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <p className="flex items-center gap-2">
                <Hand />
                Mark Attendance
              </p>
            )}
          </Button>
        </div>
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
    </>
  );
};

export default Attendance;
