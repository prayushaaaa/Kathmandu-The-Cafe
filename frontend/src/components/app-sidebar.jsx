import { Frame, PieChart } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "ktc.admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      title: "Dashboard",
      url: "/",
      icon: PieChart,
    },
    {
      title: "Sales",
      url: "/sales",
      icon: Frame,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: Frame,
    },
    {
      title: "Menu",
      url: "/menu",
      icon: Frame,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
