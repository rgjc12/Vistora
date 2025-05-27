import {
  Bell,
  Clock,
  ListChecks,
  Settings,
  ShieldQuestionIcon,
  User,
} from "lucide-react";

export const mainDashNav = [
  {
    label: "Claims Summary",
    icon: <Clock />,
    link: "/dashboard/claims-summary",
  },
  {
    label: "Profile",
    icon: <User />,
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
    link: "/dashboard/",
  },
  {
    label: "Help & Support",
    icon: <ShieldQuestionIcon />,
    link: "/dashboard/",
  },
  {
    label: "Settings",
    icon: <Settings />,
    link: "/dashboard/settings",
  },
];
