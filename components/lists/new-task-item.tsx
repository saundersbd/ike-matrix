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
        <span className="inline-flex items-center gap-1 text-xs">
          <CalendarDays className="size-3.25 text-stone-500 -mt-[1px]" />
          <span>Today</span>
        </span>
      );
    } else if (dueDate < new Date()) {
      return (
        <span className="inline-flex items-center gap-1 text-xs">
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
        <span className="inline-flex items-center gap-1 text-xs">
          <CalendarDays className="size-3.25 text-stone-500" />
          {format(dueDate, "MMM d")}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.25 text-stone-500" />
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
        "group/list-item flex flex-col gap-2 rounded-[8px] transition-all duration-200 p-3.5 bg-background border border-default-border/70"
      )}
    >
      <div className="flex flex-col flex-1 gap-1">
        {(task.projectId || task.dueDate) && (
          <div className="flex items-center gap-2 text-xs text-stone-500">
            {task.projectId && (
              <span
                className={cn(
                  "text-xs font-normal inline-flex items-center gap-1",
                  projectTheme
                )}
              >
                {projects.find((p) => p.id === task.projectId)?.name}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-start flex-1 gap-2">
        <Checkbox
          className={cn(
            "flex-shrink-0 mt-[1.5px] border-stone-300 group-hover/list-item:border-stone-500 group-hover/list-item:bg-stone-100/60 transition-all duration-200"
          )}
        />

        <div className="flex flex-col flex-1 gap-1">
          <p className="text-base font-semibold leading-snug">{task.title}</p>
          {(task.projectId || task.dueDate) && (
            <div className="flex items-center gap-2 font-normal text-xs text-stone-500">
              {task.dueDate && (
                <>
                  {task.dueDate && formatDueDate(task.dueDate)}
                  {task.dueTime && !isOverdue && (
                    <>
                      ,{" "}
                      <span className="text-xs text-stone-500">
                        {format(task.dueTime, "h:mm a")}
                      </span>
                    </>
                  )}
                </>
              )}
              {/* {task.projectId && task.dueDate && (
                <Circle className="w-1 h-1 text-stone-400/60 fill-stone-400/60" />
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
              )} */}
            </div>
          )}
        </div>

        <div className="flex items-center self-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden group-hover/list-item:flex text-stone-600 hover:bg-stone-300/60 hover:text-stone-800 transition-all duration-200"
          >
            <Ellipsis className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-stone-600 hover:bg-stone-300/60 hover:text-stone-800 transition-all duration-200 hover:cursor-grab"
          >
            <GripVertical className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
