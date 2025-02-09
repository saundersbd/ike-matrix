"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isToday, formatDistance, format, isTomorrow } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";

import { handleTaskCompletion } from "@/app/utils/taskHandlers";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";
import { CircleAlert } from "lucide-react";

export function TaskListTableRow({ task }: { task: Task }) {
  const { updateTask, projects } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  return (
    <div className="group/whole-row flex items-start gap-3 transition-all duration-150">
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="mt-[12px] border-zinc-300 hover:border-zinc-400"
      />
      <Link
        href={`/task/${task.id}`}
        className="group/table-list-item flex flex-col grow gap-1 border-b border-zinc-200/70 group-last/whole-row:border-b-0 py-3 px-0.5"
      >
        <div className="flex grow gap-2 peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400">
          <p className="mr-auto text-sm leading-snug font-medium group-hover/table-list-item:underline">
            {task.title}
          </p>

          {task.dueDate && (
            <div
              className={cn(
                "shrink-0 flex gap-1.5 text-xs font-medium text-zinc-400",
                {
                  "items-start": task.projectId,
                  "items-center": !task.projectId,
                }
              )}
              title={format(task.dueDate, "MMM d, yyyy")}
            >
              {isToday(task.dueDate) ? (
                "Today"
              ) : task.dueDate < new Date() ? (
                <span className="inline-flex items-center gap-1.5 text-red-600">
                  <CircleAlert className="w-4 h-4" />
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
        {task.projectId && (
          <div className="flex items-baseline gap-2 font-medium text-xs">
            {task.projectId && (
              <span
                className={`text-xs
              ${
                CUSTOM_THEME_COLORS[
                  projects.find((p) => p.id === task.projectId)?.theme ??
                    "default"
                ].textColor
              }`}
              >
                #{projects.find((p) => p.id === task.projectId)?.name}
              </span>
            )}
          </div>
        )}
      </Link>
    </div>
  );
}
