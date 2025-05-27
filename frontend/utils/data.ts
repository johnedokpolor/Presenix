import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";

export const menuList = [
  {
    id: 0,
    name: "Dashboard",
    icon: LayoutIcon,
    path: "/dashboard",
  },
  {
    id: 1,
    name: "Students",
    icon: GraduationCap,
    path: "/dashboard/students",
  },
  {
    id: 2,
    name: "Attendance",
    icon: Hand,
    path: "/dashboard/attendance",
  },
  {
    id: 3,
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];
