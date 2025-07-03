/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Custom renderer for the pie chart labels
export interface Props {
  data: Array<{ title: string; count: number }>;
  colors: string[];
}
const CustomPieChart: React.FC<Props> = ({ data, colors }) => {
  // Custom tooltip formatter
  const customTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow">
          <p className="font-bold text-gray-800">{`${payload[0].name}`}</p>
          <p className="text-gray-600">{`Percentage: ${(
            (payload[0].value /
              data.reduce((sum, entry) => sum + entry.count, 0)) *
            100
          ).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={330}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="title"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell
              key={`${entry}-${index}`}
              fill={colors[index % colors.length]}
              stroke="#fff"
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Tooltip content={customTooltip} />
        {/* You can uncomment this to use Recharts Legend instead of your CustomLegend */}
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
