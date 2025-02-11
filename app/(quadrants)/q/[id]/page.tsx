"use client";

import { use } from "react";
import { useNewTaskDialog } from "@/components/workspace-content";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useTasks } from "@/hooks/use-tasks";
import { TaskList } from "@/components/lists/task-list";
import { TaskListTableRow } from "@/components/lists/task-list-table-row";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const QuadrantPage: React.FC<PageProps> = ({ params }) => {
  const { openNewTaskDialog } = useNewTaskDialog();
  const resolvedParams = use(params);
  const quadrantId = parseInt(resolvedParams.id);

  // Validate quadrant ID
  if (isNaN(quadrantId) || quadrantId < 1 || quadrantId > 4) {
    notFound();
  }

  const { tasks, sortBy } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    showCompleted: false,
    showArchived: false,
    projectId: null,
    quadrantId,
  });

  const handleNewTask = () => {
    openNewTaskDialog(undefined);
  };

  return (
    <>
      <div className="ring-1 ring-black/[.05] rounded-2xl bg-white shadow-xs">
        {sortedAndFilteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-sm text-zinc-700 gap-4">
            <p>No tasks in this quadrant</p>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleNewTask}
            >
              <Plus className="size-4" />
              <span>Create a task</span>
            </Button>
          </div>
        ) : (
          <TaskList gap={false} className="px-5 py-3">
            {sortedAndFilteredTasks.map((task) => (
              <TaskListTableRow key={task.id} task={task} />
            ))}
          </TaskList>
        )}
      </div>
    </>
  );
};

export default QuadrantPage;
