// components/Charts/ClaimsDonutChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { claimsBreakdownData } from "../../../lib/mockClaimData";

const COLORS = [
  "hsl(var(--primary))", // Approved
  "hsl(var(--primary-light))", // Pending
  "hsl(var(--primary-dark))",
]; // green, yellow, red

const ClaimsDonutChart = () => {
  const totalClaims = claimsBreakdownData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="w-full h-[350px] relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={claimsBreakdownData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {claimsBreakdownData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute text-center">
        <p className="text-lg font-semibold text-gray-800">Total Claims</p>
        <p className="text-2xl font-bold text-gray-900">{totalClaims}</p>
      </div>
    </div>
  );
};

export default ClaimsDonutChart;
