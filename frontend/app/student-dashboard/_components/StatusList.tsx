import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  presentPer: number;
  absentPer: number;
}

const StatusList: React.FC<Props> = ({ presentPer, absentPer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
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
