import React, { useState } from "react";
import DashboardBarChart from "./DashboardBarChart";

const ReimbursementChartDashboard = () => {
  const [range, setRange] = useState("month")
  return (
    <div className="font-['Manrope',_sans-serif] w-full h-fit shadow rounded-2xl p-4 flex flex-col gap-2 border border-neutral-200">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-md lg:text-lg">AI-Powered Reimbursement Trends</h3>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
            <span className="text-purple-600 text-sm">🤖</span>
            <span className="text-purple-700 text-xs font-semibold">Predictive Analytics</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["month", "quarter", "year"].map((r) => (
            <button
              key={r}
              className={`px-4 py-1 rounded-[6px] font-semibold hover:bg-purple-600/25 text-[0.75rem] transition-all duration-200 ${
                range === r ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setRange(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full pt-2 h-fit">
        <DashboardBarChart range={range} />
      </div>
      <div className="text-medium text-xl px-10">
        <span className="">{range === "month" ? "June" : range === "quarter" ? "Quarter 2" : "2025"}</span>
      </div>
      <div className="flex items-start gap-8 min-h-14 px-10">
        <div className="flex flex-col items-start">
          <p className="text-sm text-neutral-400">AI Predicted Revenue</p>
          <p className="text-lg font-medium">
            {range === "month" ? "$2,500.00" : range === "quarter" ? "$6,850.00" : "$1,250,000.00"}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm text-neutral-400">AI Approved Claims</p>
          <p className="text-lg font-medium">{range === "month" ? "120" : range === "quarter" ? "350" : "1500"}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm text-neutral-400">AI Flagged Claims</p>
          <p className="text-lg font-medium">{range === "month" ? "10" : range === "quarter" ? "24" : "80"}</p>
        </div>
      </div>
    </div>
  )
}

export default ReimbursementChartDashboard
