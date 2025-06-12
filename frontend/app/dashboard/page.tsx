"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import { Student } from "@/app/dashboard/students/page";
import StatusList from "./_components/StatusList";
import CustomPieChart from "./_components/PieChart";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const [dark, setdark] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceLinks, setAttendanceLinks] = useState([]);

  // Calculates students attendance percentage
  let percentage = 0;
  students.map((student: any) => {
    percentage += (student.attendanceNo / attendanceLinks.length) * 100;
  });
  const averageAttendance = percentage / students.length;
  console.log(averageAttendance);

  useEffect(() => {
    GetAllStudents();
    GetAttendanceLinks();
    return () => {};
  }, []);

  const GetAllStudents = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setStudents(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };
  const GetAttendanceLinks = async () => {
    try {
      const response = await axiosInstance.get("/users/attendancelinks");
      setAttendanceLinks(response.data.attendanceTokens);
      console.log(response.data.attendanceTokens);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (dark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [dark]);

  const PieChartData = [
    {
      title: "Total Present",
      count: Math.floor(averageAttendance),
    },
    {
      title: "Total Absent",
      count: Math.floor(100 - averageAttendance),
    },
  ];

  const colors = ["#4C8CF8", "#1FE6D1"];
  return (
    <div className="p-5 md:p-7 ">
      <p className="font-bold text-2xl">Dashboard</p>

      <StatusList
        totalStudents={students.length}
        presentPer={averageAttendance}
        absentPer={100 - averageAttendance}
      />

      <div className="border p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-xl">Attendance Percentage</h5>
        </div>
        {averageAttendance ? (
          <CustomPieChart data={PieChartData} colors={colors} />
        ) : (
          <p>No Student Attendance</p>
        )}
      </div>

      {/* <Button onClick={handleLogout}>Logout</Button> */}
    </div>
  );
};

export default Dashboard;
