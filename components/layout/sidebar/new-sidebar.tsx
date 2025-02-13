"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import { Info, ListOrdered, Inbox, History } from "lucide-react";
import { navigationItems } from "@/lib/navigation";

export function NewSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { tasks, projects } = useWorkspace();

  return (
    <Sidebar collapsible="icon" className="bg-zinc-100" {...props}>
      <SidebarHeader className="flex justify-end p-5 dark:bg-zinc-800"></SidebarHeader>
      <SidebarContent className="dark:bg-zinc-800">
        <NavMain items={navigationItems} />
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter className="p-5 dark:bg-zinc-800">
        <SidebarMenuButton className="text-sm font-semibold">
          <Info className="w-4 h-4" />
          <span>About the system</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
