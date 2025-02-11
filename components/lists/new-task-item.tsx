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
          <CalendarDays className="size-3.25 text-zinc-500" />
          Today
        </span>
      );
    } else if (dueDate < new Date()) {
      return (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.25 text-red-500" />
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

  const projectTheme =
    CUSTOM_THEME_COLORS[
      projects.find((p) => p.id === task.projectId)?.theme ?? "default"
    ].textColor;

  return (
    <div
      className={cn(
        "group/list-item min-h-[3.25rem] flex items-center gap-2.5 py-2.5 px-3 hover:bg-zinc-200/60 rounded-lg transition-all duration-200",
        (task.dueDate || task.projectId) && "items-start"
      )}
    >
      <Checkbox
        className={cn(
          "flex-shrink-0 mt-0 group-hover/list-item:border-zinc-500 group-hover/list-item:bg-zinc-100/60 transition-all duration-200",
          (task.dueDate || task.projectId) && "mt-[2px]"
        )}
      />
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
                className={cn(
                  "text-xs font-medium inline-flex items-center gap-1",
                  projectTheme
                )}
              >
                <SquareChartGantt className="size-3.5" />
                {projects.find((p) => p.id === task.projectId)?.name}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center self-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="hidden group-hover/list-item:flex text-zinc-600 hover:bg-zinc-300/60 hover:text-zinc-800 transition-all duration-200"
        >
          <Ellipsis className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden group-hover/list-item:flex text-zinc-600 hover:bg-zinc-300/60 hover:text-zinc-800 transition-all duration-200 hover:cursor-grab"
        >
          <GripVertical className="size-4" />
        </Button>
      </div>
    </div>
  );
}
