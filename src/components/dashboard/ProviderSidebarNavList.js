import {
  Bell,
  Clock,
  File,
  FilePlus,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShieldQuestionIcon,
  User,
} from "lucide-react";

export const mainDashNav = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    link: "/dashboard/provider/home",
  },
  {
    label: "Claims",
    icon: <File />,
    link: "/dashboard/provider/claims",
  },
  {
    label: "Submit New Claim",
    icon: <FilePlus />,
    link: "/dashboard/provider/submitClaim",
  },
  {
    label: "Tasks",
    icon: <ListChecks />,
    link: "/dashboard/provider/tasks",
  },
  {
    label: "Notifications",
    icon: <Bell />,
    link: "/dashboard/provider/notifications",
  },
  {
    label: "Help & Support",
    icon: <ShieldQuestionIcon />,
    link: "/dashboard/provider/help",
  },
  {
    label: "Profile",
    icon: <User />,
    link: "/dashboard/provider/profile",
  },
  {
    label: "Settings",
    icon: <Settings />,
    link: "/dashboard/provider/settings",
  },
];
