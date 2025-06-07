import React from "react";
import ClaimsDonutChart from "./ClaimsDonutChart";

const ClaimBreakdownCard = () => {
  return (
    <div className="font-['Manrope',_sans-serif] w-full h-full shadow rounded-2xl p-4 flex flex-col gap-2 border border-neutral-200">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-md lg:text-lg ">Current Claim Breakdowns</h3>
      </div>
      <div className="w-full">
        <ClaimsDonutChart />
      </div>
      <div className="w-fit self-end gap-1 px-6 py-2 bg-neutral-200 flex flex-col rounded-[6px]">
        <p className="text-[0.75rem] flex gap-2 items-center">
          {" "}
          <div className="w-2 h-2 rounded-full bg-primary text-transparent"></div>{" "}
          320 Approved Claims
        </p>
        <p className="text-[0.75rem] flex gap-2 items-center">
          {" "}
          <div className="w-2 h-2 rounded-full bg-primary-light text-transparent"></div>{" "}
          180 Pending Claims
        </p>
        <p className="text-[0.75rem] flex gap-2 items-center">
          {" "}
          <div className="w-2 h-2 rounded-full bg-primary-dark text-transparent"></div>{" "}
          70 Rejected Claims
        </p>
      </div>
    </div>
  );
};

export default ClaimBreakdownCard;
