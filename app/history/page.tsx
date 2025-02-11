"use client";

import { useTasks } from "@/hooks/use-tasks";
import { CompletedTaskItem } from "@/components/lists/completed-task-item";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

export default function InboxPage() {
  const { tasks, sortBy } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    completedOnly: true,
    showCompleted: true,
    showArchived: false,
    projectId: null,
    quadrantId: null,
  });

  const resortedTasks = sortedAndFilteredTasks.sort((a, b) => {
    if (a.completed && b.completed) {
      return b.completedAt.getTime() - a.completedAt.getTime();
    }
    return 0;
  });

  return (
    <div className="flex flex-1 flex-col px-12 py-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 container">
        <header className="flex flex-col gap-2.5">
          <h1 className="text-2xl font-semibold">History</h1>
          <p className="text-sm text-zinc-500">
            Tasks will be moved here when you complete them.
          </p>
        </header>
        {resortedTasks.length === 0 ? (
          <div className="ring-1 ring-black/[.05] rounded-2xl bg-white shadow-xs">
            <div className="flex flex-col items-center justify-center p-8 text-sm text-zinc-700 gap-4">
              <p>You haven't completed any tasks recently.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedAndFilteredTasks.map((task) => (
              <CompletedTaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
