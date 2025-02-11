"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Task } from "@/app/types/Task";
import { Checkbox } from "@/components/ui/checkbox";
import { Circle } from "lucide-react";
import { formatDistance, isToday, isTomorrow, format } from "date-fns";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";

interface InboxItemProps {
  task: Task;
}
export function InboxItem({ task }: InboxItemProps) {
  const { updateTask, projects } = useWorkspace();
  const isOverdue = task.dueDate && task.dueDate < new Date();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  return (
    <div
      className={cn(
        { "items-start": task.dueDate },
        { "items-center": !task.dueDate },
        "bg-white hover:bg-zinc-50/[.99] transition-all duration-200",
        "group/drag-handle flex gap-2.5 shadow-xs ring-1 ring-black/[.08] rounded-[12px] pl-3.5 pr-3.5 py-3"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className={cn("border-zinc-300 hover:border-zinc-400 mt-px", {
          "mt-0": !task.dueDate,
        })}
      />
      <Link
        href={`/task/${task.id}`}
        className="group/task-list-item flex grow flex-col gap-0.5 pointer-events-auto"
      >
        <p className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-sm leading-snug font-medium">
          {task.title}
        </p>
        {(task.projectId || task.dueDate) && (
          <div className="flex items-center gap-2 font-medium text-xs">
            {task.dueDate && (
              <span className="text-zinc-500">
                {task.dueDate && isToday(task.dueDate) ? (
                  "Today"
                ) : task.dueDate && task.dueDate < new Date() ? (
                  <span className="inline-flex items-center gap-1.5 text-red-600">
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

                {task.dueTime && !isOverdue && (
                  <>
                    ,{" "}
                    <span className="text-xs text-zinc-500">
                      {format(task.dueTime, "h:mm a")}
                    </span>
                  </>
                )}
              </span>
            )}
            {task.projectId && task.dueDate && (
              <Circle className="w-1 h-1 text-zinc-400/60 fill-zinc-400/60" />
            )}
            {task.projectId && (
              <span
                className={`text-xs font-medium
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
      <div className="h-full flex items-center opacity-0 group-hover/drag-handle:opacity-100 transition-opacity cursor-grab active:cursor-grabbing duration-200">
        <div className="flex items-center justify-center px-1 py-2 rounded-md hover:bg-zinc-200/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M108,60A16,16,0,1,1,92,44,16,16,0,0,1,108,60Zm56,16a16,16,0,1,0-16-16A16,16,0,0,0,164,76ZM92,112a16,16,0,1,0,16,16A16,16,0,0,0,92,112Zm72,0a16,16,0,1,0,16,16A16,16,0,0,0,164,112ZM92,180a16,16,0,1,0,16,16A16,16,0,0,0,92,180Zm72,0a16,16,0,1,0,16,16A16,16,0,0,0,164,180Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
