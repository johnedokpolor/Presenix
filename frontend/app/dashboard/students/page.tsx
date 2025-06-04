"use client";
import React, { useEffect, useState } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import StudentListTable from "./_components/StudentListTable";
import axiosInstance from "@/utils/axiosInstance";

const Students = () => {
  type Student = {
    name: string;
    matricNumber: string;
    attendanceNo: string;
  };
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceLinks, setAttendanceLinks] = useState([]);

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
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl  flex items-center justify-between">
        Students
        <AddNewStudent />
      </h2>

      <StudentListTable students={students} attendanceLinks={attendanceLinks} />
    </div>
  );
};

export default Students;
