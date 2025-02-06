import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Task } from "@/app/types/Task";
import { Pill } from "@/components/pill";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { TaskListItem } from "@/components/task-list-item";
import { TaskList } from "@/components/task-list";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";

export function AppSidebar({ tasks }: { tasks: Task[] }) {
  const tasksToDisplay = tasks.filter(
    (task) => !task.completed || task.isCompletionTransitioning
  );

  return (
    <Sidebar
      className="top-[150px] bg-zinc-50 h-[calc(100svh-128px-var(--spacing(1))]"
      variant="floating"
    >
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-3 gap-3 bg-zinc-white border-b border-zinc-200/80">
        <div className="flex items-center gap-2.5 min-h-8">
          <h2 className={cn("text-sm font-semibold inline-flex text-zinc-800")}>
            To be processed
          </h2>
          <Pill
            count={tasksToDisplay.length}
            theme="subtleGray"
            className="!bg-zinc-200/60"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 hover:bg-zinc-200/40 text-zinc-600 hover:text-zinc-800"
              )}
            >
              <HelpCircle className={`w-4 h-4`} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-76 text-sm">
            Dump tasks here until you're ready to prioritize them.
          </PopoverContent>
        </Popover>
      </SidebarHeader>
      <SidebarContent>
        {tasksToDisplay.length > 0 ? (
          <div className="relative flex flex-col grow">
            <ScrollArea>
              <TaskList className="p-4.5">
                {tasksToDisplay.map((task) => (
                  <TaskListItem key={task.id} task={task} parent="sidebar" />
                ))}
              </TaskList>
            </ScrollArea>
            <NewTaskDialog
              theme="gray"
              defaultDestination="Backlog"
              variant="fab"
            />
          </div>
        ) : (
          <div className="flex bg-white/80 flex-col grow items-center justify-center p-10">
            <h3 className="mb-2 font-semibold text-base">
              Start here, sort later
            </h3>
            <p className="mb-5 text-sm text-zinc-500 text-center">
              Get all of your to-dos out of your brain and into this box, to be
              prioritized later.
            </p>
            <NewTaskDialog
              defaultDestination="Backlog"
              theme="gray"
              buttonVariant="secondary"
            />
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
