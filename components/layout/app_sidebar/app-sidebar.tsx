import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Task } from "@/app/types/Task";
import { NewTaskDialog } from "@/components/dialogs/new-task-dialog";
import { TaskListItem } from "@/components/lists/task-list-item";
import { TaskList } from "@/components/lists/task-list";
import { HelpCircle } from "lucide-react";
import { QUADRANTS } from "@/app/types/Quadrant";
import { EmptyState } from "@/components/common/empty-state";
import { CardHeader } from "../card-header";

export function AppSidebar({
  tasks,
  setIsNewTaskDialogOpen,
}: {
  tasks: Task[];
  setIsNewTaskDialogOpen: (isOpen: boolean) => void;
}) {
  const tasksToDisplay = tasks.filter(
    (task) => !task.completed || task.isCompletionTransitioning
  );

  return (
    <Sidebar
      className="top-[150px] bg-zinc-50 h-[calc(100svh-128px-var(--spacing(1))]"
      variant="floating"
    >
      <SidebarHeader className="p-0">
        <CardHeader
          title="To be prioritized"
          pill={tasksToDisplay.length.toString()}
          popover={{
            icon: HelpCircle,
            content:
              "Tasks in this quadrant are waiting to be prioritized later.",
          }}
        />
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
            <NewTaskDialog defaultDestination={QUADRANTS[0]} />
          </div>
        ) : (
          <EmptyState
            onClick={{
              label: "Add task",
              action: () => setIsNewTaskDialogOpen(true),
            }}
            heading="Start here, sort later"
            description="Get all of your to-dos out of your brain and into this box, to be prioritized later."
            buttonVariant="secondary"
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
}
