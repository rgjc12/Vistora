import { AlertCircleIcon, ArrowRight, Bell } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserToolBar = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const handleProfileClick = () => {
    if (role === "TPA") {
      navigate("/dashboard/tpa/home");
    } else if (role === "Provider") {
      navigate("/dashboard/provider/profile");
    } else {
      navigate("/dashboard/");
    }
  };

  const handleNotificationsClick = () => {
    if (role === "TPA") {
      navigate("/dashboard/tpa/home");
    } else if (role === "Provider") {
      navigate("/dashboard/provider/notifications");
    } else {
      navigate("/dashboard/");
    }
  };

  return (
    <div className="w-full p-4 flex flex-wrap items-center justify-between border-b border-neutral-200">
      <div className="flex items-center gap-2">
        <span className="text-neutral-600 text-sm flex items-center gap-1 relative">
          <div className="absolute size-4 bg-primary-dark text-white -right-2 -top-1 rounded-full flex items-center justify-center font-semibold text-[0.5rem]">
            1
          </div>
          <AlertCircleIcon className="size-[24px]" />
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="relative">
          <div className="absolute size-4 bg-primary text-white -right-1 -top-2 rounded-full flex items-center justify-center font-semibold text-[0.5rem]">
            5
          </div>
          <Bell
            onClick={handleNotificationsClick}
            className="size-[24px] text-neutral-400 hover:text-primary cursor-pointer"
          />
        </span>
        <div
          onClick={handleProfileClick}
          className="w-12 h-12 overflow-hidden rounded-full bg-neutral-200 cursor-pointer hover:border-2 hover:border-primary"
        >
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
