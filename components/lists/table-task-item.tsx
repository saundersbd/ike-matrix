"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Task } from "@/app/types/Task";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";
import { format, formatDistance, isToday, isTomorrow } from "date-fns";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";
import {
  Circle,
  CalendarDays,
  SquareChartGantt,
  Ellipsis,
  GripVertical,
} from "lucide-react";

export function TableTaskItem({ task }: { task: Task }) {
  const { updateTask, projects } = useWorkspace();

  const handleCheckboxChange = (checked: boolean) => {
    handleTaskCompletion(checked, task, updateTask);
  };

  const isOverdue = task.dueDate && task.dueDate < new Date();

  const formatDueDate = (dueDate: Date) => {
    if (isToday(dueDate)) {
      return (
        <span className="inline-flex items-center gap-1.25 text-xs">
          <CalendarDays className="size-3.25 text-zinc-500 -mt-[1px]" />
          <span>Today</span>
        </span>
      );
    } else if (dueDate < new Date()) {
      return (
        <span className="inline-flex items-center gap-1.25 text-xs">
          <CalendarDays className="size-3.25 text-red-500 -mt-[1px]" />
          <span>
            {formatDistance(dueDate, new Date(), { addSuffix: true }).replace(
              /^about /,
              ""
            )}
          </span>
          {task.dueTime && <>, {format(task.dueTime, "h:mm a")}</>}
        </span>
      );
    } else if (isTomorrow(dueDate)) {
      return "Tomorrow";
    } else {
      return dueDate.getFullYear() === new Date().getFullYear() ? (
        <span className="inline-flex items-center gap-1.25 text-xs">
          <CalendarDays className="size-3.25 text-zinc-500 -mt-[1px]" />
          {format(dueDate, "MMM d")}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.25">
          <CalendarDays className="size-3.25 text-zinc-500-mt-[1px]" />
          {format(dueDate, "MMM d, yyyy")}
        </span>
      );
    }
  };

  const projectTheme =
    CUSTOM_THEME_COLORS[
      projects.find((p) => p.id === task.projectId)?.theme ?? "default"
    ].textColor;

  return (
    <div
      className={cn(
        "group/list-item flex items-center gap-2.5 py-3 px-8 transition-all duration-200",
        "hover:bg-zinc-100"
        // "border-b border-default-border/60 last:border-b-0"
      )}
    >
      <Checkbox
        className={cn(
          "flex-shrink-0 mt-0 group-hover/list-item:border-zinc-500 group-hover/list-item:bg-zinc-100/60 transition-all duration-200"
        )}
      />
      <div className="flex flex-col flex-1 gap-1.25">
        <p className="text-base font-semibold leading-snug">{task.title}</p>
      </div>
      <div className="flex items-center self-center gap-1">
        {(task.projectId || task.dueDate) && (
          <div className="flex shrink-0 items-center gap-2 font-medium text-xs text-zinc-600">
            {task.projectId && (
              <span
                className={cn(
                  "text-xs font-medium inline-flex items-center gap-1.25 -mt-[1px]",
                  projectTheme
                )}
              >
                <SquareChartGantt className="size-3.5" />
                {projects.find((p) => p.id === task.projectId)?.name}
              </span>
            )}
            {task.projectId && task.dueDate && (
              <Circle className="w-1 h-1 text-zinc-400/70 fill-zinc-400/70" />
            )}

            {task.dueDate && task.dueDate && (
              <>
                {task.dueDate && formatDueDate(task.dueDate)}
                {task.dueTime && !isOverdue && (
                  <>
                    ,{" "}
                    <span className="text-xs text-zinc-600">
                      {format(task.dueTime, "h:mm a")}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
