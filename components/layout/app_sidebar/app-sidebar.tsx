import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Task } from "@/app/types/Task";
import { TaskListItem } from "@/components/lists/task-list-item";
import { TaskList } from "@/components/lists/task-list";
import { HelpCircle } from "lucide-react";
import { QUADRANTS } from "@/app/types/Quadrant";
import { EmptyState } from "@/components/common/empty-state";
import { CardHeader } from "../card-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AppSidebar({
  tasks,
  handleOpenNewTaskDialog,
}: {
  tasks: Task[];
  handleOpenNewTaskDialog: (quadrantId: number) => void;
}) {
  const tasksToDisplay = tasks.filter(
    (task) => !task.completed || task.isCompletionTransitioning
  );

  return (
    <Sidebar
      className="top-[94px] bg-transparent h-[calc(100svh-64px-4rem)]"
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
            <Button
              onClick={() => handleOpenNewTaskDialog(0)}
              className="absolute bottom-5 right-5"
              size="fab"
              variant="secondary"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <EmptyState
            onClick={{
              label: "Add task",
              action: () => handleOpenNewTaskDialog(0),
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
