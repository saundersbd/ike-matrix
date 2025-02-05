"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import Link from "next/link";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";
import { cn } from "@/lib/utils";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";

export function BacklogListItem({ task }: { task: Task }) {
  const { updateTask } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  return (
    <div
      className={cn(
        "group/task-list-item flex gap-3.5",
        "transform-gpu transition-all duration-300 ease-in-out will-change-transform"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="shrink-0 border-zinc-300 hover:border-zinc-400 mt-[1px]"
      />
      <div className="flex flex-col gap-1 peer-has-[data-state=checked]:line-through peer-has-[data-state=checked]:text-zinc-400">
        <Link
          href={`/task/${task.id}`}
          className="grow text-base leading-snug font-medium text-zinc-800 hover:underline"
        >
          {task.title}
        </Link>

        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 ">
            {format(task.dueDate, "MMM d, yyyy")}
          </div>
        )}
      </div>
    </div>
  );
}
