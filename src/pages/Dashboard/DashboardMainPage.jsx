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
    </div>
  );
};

export default DashboardMainPage;
