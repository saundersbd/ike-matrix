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
import { TaskList } from "@/components/task-list";
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
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-3 gap-3 bg-zinc-100">
        <div className="flex items-center gap-2.5 min-h-8">
          <Pill count={tasksToDisplay.length} theme="gray" />
          <h2 className={cn("text-sm font-semibold inline-flex text-zinc-800")}>
            Backlog
          </h2>
        </div>
        <NewTaskDialog
          defaultDestination="Backlog"
          theme="gray"
          inlineTrigger
        />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="grow">
          {tasksToDisplay.length > 0 ? (
            <TaskList className="p-5">
              {tasksToDisplay.map((task) => (
                <BacklogListItem key={task.id} task={task} />
              ))}
            </TaskList>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-sm text-zinc-500">Empty state</span>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
