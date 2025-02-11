"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";
import { format, formatDistance, isToday, isTomorrow } from "date-fns";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";
import { Circle, CalendarDays } from "lucide-react";

export function NewTaskItem({ task }: { task: Task }) {
  const { updateTask, projects } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  const isOverdue = task.dueDate && task.dueDate < new Date();

  const formatDueDate = (dueDate: Date) => {
    if (isToday(dueDate)) {
      return (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-zinc-500" />
          Today
        </span>
      );
    } else if (dueDate < new Date()) {
      return (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-red-500" />
          {formatDistance(dueDate, new Date(), { addSuffix: true }).replace(
            /^about /,
            ""
          )}
          {task.dueTime && <>, {format(task.dueTime, "h:mm a")}</>}
        </span>
      );
    } else if (isTomorrow(dueDate)) {
      return "Tomorrow";
    } else {
      return format(
        dueDate,
        dueDate.getFullYear() === new Date().getFullYear()
          ? "MMM d"
          : "MMM d, yyyy"
      );
    }
  };

  return (
    <div className="flex gap-2.5">
      <Checkbox className="flex-shrink-0 mt-[2px]" />
      <div className="flex flex-col flex-1 gap-1.25">
        <p className="text-base font-medium">{task.title}</p>
        {(task.projectId || task.dueDate) && (
          <div className="flex items-center gap-2 font-medium text-xs">
            {task.dueDate && (
              <span className="text-zinc-500">
                {task.dueDate && formatDueDate(task.dueDate)}
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
      </div>
    </div>
  );
}
