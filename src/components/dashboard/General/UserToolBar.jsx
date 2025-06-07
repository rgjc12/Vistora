import { AlertCircleIcon, ArrowRight, Bell } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserToolBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-4 flex flex-wrap items-center justify-between border-b border-neutral-200">
      <div className="flex items-center gap-2">
        <span className="text-neutral-600 text-sm flex items-center gap-1 relative">
          <div className="absolute size-4 bg-primary-dark text-white -right-2 -top-1 rounded-full flex items-center justify-center font-semibold text-[0.5rem]">
            1
          </div>
          <AlertCircleIcon className="size-[24px]" />
        </span>
        <div className="px-4 py-2 hidden lg:flex items-center justify-between gap-8 bg-neutral-100 text-neutral-600 text-sm rounded-[10px]">
          <div className="flex items-center gap-2">
            <strong>AI Predictions:</strong>
            <span>1 flagged claims may be at risk this week</span>
          </div>
          <a
            href="/dashboard/claims-summary"
            className="text-neutral-600 hover:text-neutral-800 w-fit text-[0.65rem] flex items-center gap-1"
          >
            View <ArrowRight className="size-[12px]" />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="relative">
          <div className="absolute size-4 bg-primary text-white -right-1 -top-2 rounded-full flex items-center justify-center font-semibold text-[0.5rem]">
            5
          </div>
          <Bell
            onClick={() => navigate("/dashboard/notifications")}
            className="size-[24px] text-neutral-400 hover:text-primary cursor-pointer"
          />
        </span>
        <div className="w-12 h-12 overflow-hidden rounded-full bg-neutral-200 cursor-pointer hover:border-2 hover:border-primary">
          <img
            src="/images/testimonial.jpg"
            className="w-full h-auto object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default UserToolBar;
