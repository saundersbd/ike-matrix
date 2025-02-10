"use client";

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
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";
export function SlimSidebar({
  tasks,
  projects,
  ...props
}: Partial<React.ComponentProps<typeof Sidebar>> & {
  tasks: Task[];
  projects?: Project[];
}) {
  const items = {
    prioritizedTasks: {
      label: "Prioritized tasks",
      path: "/",
      icon: ListOrdered,
      subItems: [
        {
          path: "/quadrant",
          label: "Urgent & important",
          theme: "!text-red-400 fill-red-400",
        },
        {
          path: "/q2",
          label: "Urgent & not important",
          theme: "!text-amber-300 fill-amber-300",
        },
        {
          path: "/q3",
          label: "Important & not urgent",
          theme: "!text-sky-400 fill-sky-400",
        },
        {
          path: "/q4",
          label: "Not urgent or important",
          theme: "!text-purple-400 fill-purple-400",
        },
      ],
    },
    inbox: {
      label: "Inbox",
      path: "/inbox",
      icon: Inbox,
    },
    history: {
      label: "History",
      path: "/history",
      icon: History,
    },
  };

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
        <NavMain items={items} />
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
