import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Task } from "@/app/types/Task";
import { Pill } from "@/components/pill";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { BacklogListItem } from "@/components/backlog-list-item";
import { cn } from "@/lib/utils";

export function AppSidebar({ tasks }: { tasks: Task[] }) {
  const tasksToDisplay = tasks.filter(
    (task) => !task.completed || task.isCompletionTransitioning
  );

  return (
    <Sidebar
      className="top-[150px] bg-zinc-50 h-[calc(100svh-128px-var(--spacing(1))]"
      variant="floating"
    >
      <SidebarHeader className="flex flex-row items-center justify-between pl-5 pr-4 py-3 gap-3 bg-zinc-100">
        <div className="flex items-center gap-2 min-h-8">
          <h2 className={cn("text-sm font-semibold inline-flex text-zinc-800")}>
            Backlog
          </h2>
          <Pill count={tasksToDisplay.length} theme="gray" />
        </div>
        <NewTaskDialog
          defaultDestination="Backlog"
          theme="gray"
          inlineTrigger
        />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="grow py-5 px-3">
          <div className="flex flex-col gap-0 transition-all duration-300">
            {tasksToDisplay.length > 0
              ? tasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      task.completed &&
                        !task.isCompletionTransitioning && [
                          "h-0",
                          "opacity-0",
                          "overflow-hidden",
                          "transform-gpu",
                          "-translate-y-full",
                        ]
                    )}
                  >
                    <BacklogListItem task={task} />
                  </div>
                ))
              : "Empty"}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
