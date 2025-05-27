import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import {
  Bell,
  BellRing,
  Clock,
  FileQuestionIcon,
  List,
  ListChecks,
  Settings,
  ShieldQuestionIcon,
  User,
} from "lucide-react";
import ClaimsSummary from "../Profile/components/ClaimsSummary";

const DashboardMainPage = () => {
  const mainDashNav = [
    {
      label: "Profile",
      icon: <User />,
    },
    {
      label: "Tasks",
      icon: <ListChecks />,
    },
    {
      label: "Notifications",
      icon: <Bell />,
    },
    {
      label: "Claims Summary",
      icon: <Clock />,
    },
    {
      label: "Help & Support",
      icon: <ShieldQuestionIcon />,
    },
    {
      label: "Settings",
      icon: <Settings />,
    },
  ];

  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} />
      <div className="flex-1 w-full p-4 pl-[316px]">
        <ClaimsSummary />
      </div>
    </div>
  );
};

export default DashboardMainPage;
