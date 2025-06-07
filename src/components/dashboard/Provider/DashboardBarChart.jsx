// components/DashboardBarChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const mockData = {
  // Each day in the current month
  month: [
    { label: "Jun 1", value: 1200 },
    { label: "Jun 2", value: 800 },
    { label: "Jun 3", value: 950 },
    { label: "Jun 4", value: 1100 },
    { label: "Jun 5", value: 700 },
    { label: "Jun 6", value: 1020 },
    { label: "Jun 7", value: 890 },
    { label: "Jun 8", value: 1300 },
    { label: "Jun 9", value: 780 },
    { label: "Jun 10", value: 920 },
    { label: "Jun 11", value: 1050 },
    { label: "Jun 12", value: 880 },
    { label: "Jun 13", value: 970 },
    { label: "Jun 14", value: 1120 },
    { label: "Jun 15", value: 910 },
  ],

  // Each month in the current quarter (e.g., Q2: Apr, May, Jun)
  quarter: [
    { label: "April", value: 24500 },
    { label: "May", value: 28100 },
    { label: "June", value: 22800 },
  ],

  // Each month of the year
  year: [
    { label: "Jan", value: 22000 },
    { label: "Feb", value: 19800 },
    { label: "Mar", value: 24200 },
    { label: "Apr", value: 24500 },
    { label: "May", value: 28100 },
    { label: "Jun", value: 22800 },
    { label: "Jul", value: 26500 },
    { label: "Aug", value: 27800 },
    { label: "Sep", value: 29000 },
    { label: "Oct", value: 30000 },
    { label: "Nov", value: 31000 },
    { label: "Dec", value: 33000 },
  ],
};

const DashboardBarChart = ({ range = "month" }) => {
  const data = mockData[range];

  return (
    <div className="w-full h-[350px] ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" className="text-[0.75rem] py-2"></XAxis>
          <YAxis className="text-[0.75rem]">
            <Label
              className="tracking-wide"
              value="Reimbursement ($)"
              angle={-90}
              position="insideLeft"
              offset={10}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            activeBar={false}
            radius={[12, 12, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;
