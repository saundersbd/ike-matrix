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
import { Info } from "lucide-react";
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
        <NavMain />
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
