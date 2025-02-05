"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";
import { format, formatDistance, isToday } from "date-fns";
export function TaskListItem({ task }: { task: Task }) {
  const { updateTask, projects } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  return (
    <div className={cn("group/task-list-item flex gap-3.5")}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="border-zinc-300 group-hover/task-list-item:border-zinc-400 mt-[1px]"
      />
      <div className="flex grow flex-col gap-0.5">
        <Link
          href={`/task/${task.id}`}
          className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-base leading-snug font-medium hover:underline"
        >
          {task.title}
        </Link>
        {task.projectId && (
          <div className="flex items-center gap-1.5 mt-1">
            <div
              className={`w-max h-[22px] flex items-center gap-1.5 text-[.8rem] font-semibold px-[6px] rounded-md bg-zinc-100 text-zinc-700`}
            >
              {task.projectId && (
                <span>
                  {projects.find((p) => p.id === task.projectId)?.name}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

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
                ? formatDistance(task.dueDate, new Date(), { addSuffix: true })
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
  );
}
