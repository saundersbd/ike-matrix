"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useTasks } from "@/hooks/use-tasks";
import { TaskList } from "@/components/lists/task-list";
import { TaskListTableRow } from "@/components/lists/task-list-table-row";

export default function QuadrantOnePage() {
  const { tasks, sortBy } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    showCompleted: false,
    showArchived: false,
    projectId: null,
    quadrantId: 1,
  });

  return (
    <>
      <div className="ring-1 ring-black/[.05] rounded-2xl bg-white shadow-xs">
        <TaskList gap={false} className="px-5 py-3">
          {sortedAndFilteredTasks.map((task) => (
            <TaskListTableRow key={task.id} task={task} />
          ))}
        </TaskList>
      </div>
    </>
  );
}
