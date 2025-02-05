"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isToday, formatDistance, format } from "date-fns";

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
        className="border-zinc-300 hover:border-zinc-400"
      />
      <div className="flex grow gap-2 peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 border-b border-zinc-200 group-last:border-b-0 py-3 px-0.5">
        <Link
          href={`/task/${task.id}`}
          className="grow text-base leading-snug font-medium hover:underline"
        >
          {task.title}
        </Link>

        {task.dueDate && (
          <div
            className={cn(
              "shrink-0 flex gap-1.5 text-xs font-semibold text-zinc-400",
              { "items-start": task.projectId, "items-center": !task.projectId }
            )}
          >
            {isToday(task.dueDate) ? (
              "Today"
            ) : task.dueDate < new Date() ? (
              <span className="text-red-500 text-xs font-semibold">
                {isToday(task.dueDate)
                  ? "Due today"
                  : task.dueDate > new Date()
                  ? formatDistance(task.dueDate, new Date(), {
                      addSuffix: true,
                    })
                  : `Due ${formatDistance(task.dueDate, new Date(), {
                      addSuffix: true,
                    }).replace(/^about /, "")}`}
              </span>
            ) : (
              format(
                task.dueDate,
                task.dueDate.getFullYear() === new Date().getFullYear()
                  ? "MMM d"
                  : "MMM d, yyyy"
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
