"use client";

import { useTasks } from "@/hooks/use-tasks";
import { InboxItem } from "@/components/lists/inbox-item";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNewTaskDialog } from "@/components/workspace-content";

export default function InboxPage() {
  const { tasks, sortBy } = useWorkspace();
  const { openNewTaskDialog } = useNewTaskDialog();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    showCompleted: false,
    showArchived: false,
    projectId: null,
    quadrantId: 0,
  });

  const handleNewTask = () => {
    openNewTaskDialog(undefined);
  };

  return (
    <div className="flex flex-1 flex-col px-10 py-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 container">
        <header className="flex flex-col gap-2.5">
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <p className="text-sm text-zinc-500">
            Get tasks out of your brain and into the inbox so you can prioritize
            them later.
          </p>
        </header>
        {sortedAndFilteredTasks.length === 0 ? (
          <div className="ring-1 ring-black/[.05] rounded-2xl bg-white shadow-xs">
            <div className="flex flex-col items-center justify-center p-8 text-sm text-zinc-700 gap-4">
              <p>The inbox is completely empty.</p>
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
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedAndFilteredTasks.map((task) => (
              <InboxItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
