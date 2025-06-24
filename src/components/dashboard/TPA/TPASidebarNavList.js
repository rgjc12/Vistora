import { File, LayoutDashboard, Settings } from "lucide-react";

export const mainDashTPANav = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    link: "/dashboard/tpa/home",
  },
  {
    label: "Claims Review",
    icon: <File />,
    link: "/dashboard/tpa/claimsReview",
  },
  {
    label: "Flagged Claims",
    icon: <File />,
    link: "/dashboard/tpa/flaggedClaims",
  },
  {
    label: "Fraud Signals",
    icon: <File />,
    link: "/dashboard/tpa/fraudSignals",
  },
  {
    label: "Providers",
    icon: <File />,
    link: "/dashboard/tpa/providers",
  },
  {
    label: "Appeals Management",
    icon: <File />,
    link: "/dashboard/tpa/appealsManagement",
  },
  {
    label: "Team Management",
    icon: <File />,
    link: "/dashboard/tpa/teamManagement",
  },
  {
    label: "Settings",
    icon: <Settings />,
    link: "/dashboard/tpa/settings",
  },
];
