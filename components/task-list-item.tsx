"use client";

import { useTasks } from "@/app/contexts/TaskContext";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";
import { CUSTOM_THEME_COLORS, ThemeName } from "@/app/types/CustomTheme";

export function TaskListItem({
  task,
  onComplete,
}: {
  task: Task;
  onComplete?: (taskId: string) => void;
}) {
  const { updateTask } = useTasks();
  const [isExiting, setIsExiting] = useState(false);

  const themeColors =
    CUSTOM_THEME_COLORS[task.theme as ThemeName] || CUSTOM_THEME_COLORS.teal;
  const { borderColor, textColor } = themeColors;

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setIsExiting(true);
      updateTask(task.id, { completed: checked });

      // Notify parent after animation starts
      onComplete?.(task.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        transition: {
          opacity: { duration: 0.2 },
        },
      }}
      className="group/task-list-item flex gap-3 py-2.5 px-3.5 rounded-lg hover:bg-zinc-100/[.5] hover:cursor-pointer transition-all duration-150"
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="border-zinc-300 group-hover/task-list-item:border-zinc-400 mt-0.75"
      />
      <div className="flex grow flex-col gap-0.5">
        <Link
          href={`/task/${task.id}`}
          className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-base leading-snug font-medium"
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
            "shrink-0 flex gap-1.5 text-sm font-medium text-zinc-400 group-hover/task-list-item:text-zinc-500",
            (task.tags ?? []).length > 0 ? "items-start" : "items-center"
          )}
        >
          {task.dueDate}
        </div>
      )}
    </motion.div>
  );
}
