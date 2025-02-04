"use client";

import { useTasks } from "@/app/contexts/TaskContext";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";
import { CUSTOM_THEME_COLORS, ThemeName } from "@/app/types/CustomTheme";
import { handleTaskCompletion } from "@/app/utils/taskHandlers";

export function TaskListItem({ task }: { task: Task }) {
  const { updateTask } = useTasks();

  const themeColors =
    CUSTOM_THEME_COLORS[task.theme as ThemeName] || CUSTOM_THEME_COLORS.teal;
  const { borderColor, textColor } = themeColors;

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
        {(task.tags ?? []).length > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            {task.tags?.map((tag) => (
              <div
                key={tag}
                className={`w-max h-[22px] flex items-center gap-1.5 text-[.8rem] font-semibold px-[6px] rounded-md ${textColor} ${borderColor}`}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {task.dueDate && (
        <div
          className={cn(
            "shrink-0 flex gap-1.5 text-sm font-medium text-zinc-400",
            (task.tags ?? []).length > 0 ? "items-start" : "items-center"
          )}
        >
          {task.dueDate}
        </div>
      )}
    </div>
  );
}
