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
    label: "Claims Summary",
    icon: <LayoutDashboard />,
    link: "/dashboard/claims-summary",
  },
  {
    label: "Claims",
    icon: <File />,
    link: "/dashboard/claims",
  },
  {
    label: "Submit New Claim",
    icon: <FilePlus />,
    link: "/dashboard/claims-summary",
  },
  {
    label: "Tasks",
    icon: <ListChecks />,
    link: "/dashboard/tasks",
  },
  {
    label: "Notifications",
    icon: <Bell />,
    link: "/dashboard/notifications",
  },
  {
    label: "Help & Support",
    icon: <ShieldQuestionIcon />,
    link: "/dashboard/",
  },
  {
    label: "Profile",
    icon: <User />,
    link: "/dashboard/claims-summary",
  },
  {
    label: "Settings",
    icon: <Settings />,
    link: "/dashboard/settings",
  },
];
