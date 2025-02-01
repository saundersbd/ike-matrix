import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar side="left" className="top-[--header-height]">
      <SidebarHeader className="p-4">
        <span className="text-base font-semibold text-zinc-800">Inbox</span>
      </SidebarHeader>
      <SidebarContent className="px-3.5">
        <div className="flex flex-col gap-2 p-3 bg-zinc-100 rounded-xl">
          <Input placeholder="Quickly capture a task" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
