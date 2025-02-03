import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Task } from "@/app/types/Task";

import { NewTaskDialog } from "@/components/new-task-dialog";
import { BacklogListItem } from "@/components/backlog-list-item";
export function AppSidebar({ tasks }: { tasks: Task[] }) {
  return (
    <Sidebar
      className="top-[150px] bg-zinc-50 h-[calc(100svh-128px-var(--spacing(1))]"
      variant="floating"
    >
      <SidebarHeader className="flex flex-row items-center justify-between px-5 py-3 gap-3 bg-zinc-100">
        <h2 className="w-max text-sm font-semibold inline-flex text-zinc-800">
          Backlog
        </h2>
        <NewTaskDialog
          defaultDestination="Backlog"
          theme="gray"
          inlineTrigger
        />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="grow py-5 px-3">
          <div className="flex flex-col gap-0">
            {tasks.length > 0
              ? tasks.map((task) => (
                  <BacklogListItem key={task.id} task={task} />
                ))
              : "Empty"}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
