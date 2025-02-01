import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <Sidebar
      side="right"
      className="top-[--header-height] bg-zinc-50 h-[calc(100svh-var(--header-height)-theme(spacing.1))]"
      variant="floating"
    >
      <SidebarHeader className="p-4 pt-5 border-b border-zinc-200 gap-3">
        <h2 className="text-lg font-medium text-zinc-800">Backlog</h2>
        <Input placeholder="Quickly capture tasks to sort later" />
        <Button variant="secondary" size="sm" className="w-max">
          Add
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-3.5">
        <div className="flex flex-col gap-2 p-3 bg-zinc-100/[.75] rounded-xl">
          <Input placeholder="Quickly capture tasks to sort later" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
