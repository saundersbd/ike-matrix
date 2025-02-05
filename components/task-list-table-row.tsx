"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";

import { handleTaskCompletion } from "@/app/utils/taskHandlers";

export function TaskListTableRow({ task }: { task: Task }) {
  const { updateTask } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  return (
    <div className="group flex items-center gap-3 transition-all duration-150">
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="border-zinc-300 group-hover:border-zinc-400"
      />
      <div className="flex grow gap-2 peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 border-b border-zinc-200 group-last:border-b-0 py-3 px-0.5">
        <Link
          href={`/task/${task.id}`}
          className="grow text-base leading-snug font-medium"
        >
          {task.title}
        </Link>

        {task.dueDate && (
          <div className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover/task-list-item:text-zinc-500">
            {task.dueDate}
          </div>
        )}
      </div>
    </div>
  );
}
