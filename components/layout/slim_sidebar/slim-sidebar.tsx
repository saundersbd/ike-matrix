"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { Info, ListOrdered, Inbox, History } from "lucide-react";
import { navigationItems } from "@/lib/navigation";

export function SlimSidebar({
  ...props
}: Partial<React.ComponentProps<typeof Sidebar>> & {}) {
  const { tasks, projects } = useWorkspace();

  return (
    <Sidebar
      collapsible="icon"
      className="border-none"
      {...props}
      data-theme="dark"
    >
      <SidebarHeader className="p-5 bg-zinc-800">
        <span className="group-data-[state=collapsed]:hidden truncate text-lg text-zinc-700 font-medium dark:text-zinc-100">
          Eisenhower matrix
        </span>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-800">
        <NavMain items={navigationItems} />
        <SidebarSeparator />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter className="p-5 bg-zinc-800">
        <SidebarMenuButton className="text-sm font-semibold">
          <Info className="w-4 h-4" />
          <span>About the system</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
