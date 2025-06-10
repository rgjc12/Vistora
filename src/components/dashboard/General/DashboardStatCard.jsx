import { AlertCircle } from "lucide-react";
import React from "react";

const DashboardStatCard = ({
  icon,
  cardTitle,
  cardNumber,
  cardAnalytics,
  cardHighlighted,
  cardMoney,
  analyticsPositive,
}) => {
  return (
    <div
      className={`w-full min-w-[200px] max-w-[275px] lg:min-w-[235px] lg:max-w-[300px] xl:min-w-[275px] xl:max-w-[315px] p-3 px-2 rounded-xl shadow flex gap-3 items-start h-[90px] lg:h-[100px] flex-1
        ${
          cardHighlighted
            ? "bg-primary-light/15 border-2 border-primary-dark text-black"
            : "bg-gradient-to-r from-primary-dark to-red-900 text-white border border-neutral-200"
        }
    `}
    >
      <div
        className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border ${
          cardHighlighted
            ? "border-primary-dark text-primary-dark"
            : "border-white text-white"
        }`}
      >
        {icon ? icon : <AlertCircle className="size-[16px] lg:size-[24px]" />}
      </div>
      <div className="w-fit flex flex-col items-start">
        <p
          className={`${
            cardHighlighted ? "text-black" : "text-white font-medium"
          } text-[0.7rem] lg:text-[0.8rem]`}
        >
          {cardTitle ? cardTitle : "Card Title"}
        </p>
        <p
          className={`text-xl lg:text-2xl font-medium ${
            cardMoney ? "text-white" : ""
          }`}
        >
          {cardNumber ? cardNumber : "$2,400.00"}
        </p>

        <p
          className={`text-[0.6rem] truncate lg:text-[0.7rem] w-full mt-2 ${
            analyticsPositive ? "text-white" : ""
          } `}
        >
          {cardAnalytics ? cardAnalytics : "12% from last month"}
        </p>
      </div>
    </div>
  );
};

export default DashboardStatCard;
