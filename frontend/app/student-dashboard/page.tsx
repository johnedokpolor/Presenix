"use client";
import React, { useEffect, useState } from "react";
import useStore from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import StatusList from "./_components/StatusList";
import CustomPieChart from "./_components/PieChart";

const Dashboard = () => {
  const { user } = useStore();

  const [attendanceLinks, setAttendanceLinks] = useState([]);

  // Calculates students attendance percentage

  useEffect(() => {
    GetAttendanceLinks();
    return () => {};
  }, []);

  const percentage = (user?.attendanceNo / attendanceLinks.length) * 100;
  console.log(user?.attendanceNo, attendanceLinks.length);
  console.log(percentage);

  const GetAttendanceLinks = async () => {
    try {
      console.log("Getting Links");
      const { data } = await axiosInstance.get("/users/attendancelinks");
      setAttendanceLinks(data.attendanceTokens);
      // console.log(data.attendanceTokens);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const PieChartData = [
    {
      title: "Total Present",
      count: Math.floor(percentage),
    },
    {
      title: "Total Absent",
      count: Math.floor(100 - percentage),
    },
  ];

  const colors = ["#4C8CF8", "#1FE6D1"];
  return (
    <div className="p-5 md:p-7 ">
      <p className="text-2xl font-bold">Dashboard</p>
      <p className="text-xl font-medium">Hello, Student {user?.name} </p>

      <StatusList presentPer={percentage} absentPer={100 - percentage} />

      <div className="p-5 border rounded-lg">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Attendance Percentage</h5>
        </div>
        {percentage ? (
          <CustomPieChart data={PieChartData} colors={colors} />
        ) : (
          <p>No Student Attendance</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
