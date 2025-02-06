"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";
import { format, formatDistance, isToday, isTomorrow } from "date-fns";

export function TaskListItem({ task }: { task: Task }) {
  const { updateTask, projects } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  return (
    <div className={cn("flex gap-3.5")}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="border-zinc-300 hover:border-zinc-400 mt-[1px]"
      />
      <Link
        href={`/task/${task.id}`}
        className="group/task-list-item flex grow flex-col gap-1"
      >
        <p className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-base leading-snug font-medium group-hover/task-list-item:underline">
          {task.title}
        </p>
        {(task.projectId || task.dueDate) && (
          <div className="flex items-center gap-2 font-medium text-xs">
            <span className="text-zinc-500">
              {task.dueDate && isToday(task.dueDate) ? (
                "Today"
              ) : task.dueDate && task.dueDate < new Date() ? (
                <span className="text-red-600">
                  {task.dueDate && isToday(task.dueDate)
                    ? "Due today"
                    : task.dueDate > new Date()
                    ? formatDistance(task.dueDate, new Date(), {
                        addSuffix: true,
                      })
                    : `Due ${formatDistance(task.dueDate, new Date(), {
                        addSuffix: true,
                      }).replace(/^about /, "")}`}
                </span>
              ) : task.dueDate && isTomorrow(new Date(task.dueDate)) ? (
                "Tomorrow"
              ) : (
                task.dueDate &&
                format(
                  task.dueDate,
                  task.dueDate.getFullYear() === new Date().getFullYear()
                    ? "MMM d"
                    : "MMM d, yyyy"
                )
              )}

              {task.dueTime && (
                <>
                  ,{" "}
                  <span className="text-xs text-zinc-500">
                    {format(task.dueTime, "h:mm a")}
                  </span>
                </>
              )}
            </span>
            {task.projectId && (
              <span className="text-xs text-zinc-500">
                #{projects.find((p) => p.id === task.projectId)?.name}
              </span>
            )}
          </div>
        )}
      </Link>
    </div>
  );
}
