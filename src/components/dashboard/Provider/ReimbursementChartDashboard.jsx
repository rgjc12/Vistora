import React from "react";

const ReimbursementChartDashboard = () => {
  return (
    <div className="w-full h-fit min-h-[550px] shadow rounded-2xl p-4 flex flex-col gap-2 border border-neutral-200">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-md lg:text-lg font-medium">Reimbursement Trends</h3>
        <div className="flex items-center gap-2">
          <div className="p-2 px-4 rounded-[6px] bg-white cursor-pointer font-medium text-neutral-400 border border-neutral-400 text-[0.75rem] hover:bg-neutral-400 hover:text-neutral-200 focus:bg-neutral-400 focus:text-neutral-200">
            Month
          </div>
          <div className="p-2 px-4 rounded-[6px] bg-white cursor-pointer font-medium text-neutral-400 border border-neutral-400 text-[0.75rem] hover:bg-neutral-400 hover:text-neutral-200">
            Quarter
          </div>
          <div className="p-2 px-4 rounded-[6px] bg-white cursor-pointer font-medium text-neutral-400 border border-neutral-400 text-[0.75rem] hover:bg-neutral-400 hover:text-neutral-200">
            Year
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementChartDashboard;
