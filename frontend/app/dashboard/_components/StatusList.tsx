import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  totalStudents: number;
  presentPer: number;
  absentPer: number;
  attendanceLinks?: number;
}

const StatusList: React.FC<Props> = ({
  totalStudents,
  presentPer,
  absentPer,
  attendanceLinks,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
      <Card
        icon={<GraduationCap />}
        title="Total Student"
        value={totalStudents.toString()}
      />

      <Card
        icon={<TrendingUp />}
        title="Total % Present"
        value={Math.ceil(presentPer) + "%"}
      />
      <Card
        icon={<TrendingDown />}
        title="Total % Absent"
        value={Math.ceil(absentPer) + "%"}
      />
    </div>
  );
};

export default StatusList;
