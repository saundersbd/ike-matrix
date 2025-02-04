"use client";

import { useTasks } from "@/app/contexts/TaskContext";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";

export function BacklogListItem({ task }: { task: Task }) {
  const { updateTask } = useTasks();

  const handleCheckboxChange = (checked: boolean) => {
    updateTask(task.id, { completed: checked });
  };

  return (
    <div className="group/list-item flex items-start gap-3.5 py-2.5 px-3.5 rounded-lg hover:bg-zinc-100/[.75] hover:cursor-grab transition-all duration-150">
      <div className="peer flex items-center justify-center pt-0.75">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleCheckboxChange}
          className="border-zinc-300 group-hover/list-item:border-zinc-400"
        />
      </div>
      <div className="flex flex-col gap-1 peer-has-data-[state=checked]:line-through peer-has-data-[state=checked]:text-zinc-400">
        <Link
          href={`/task/${task.id}`}
          className="grow text-base leading-snug font-medium text-zinc-800"
        >
          {task.title}
        </Link>

        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover/list-item:text-zinc-500">
            {task.dueDate}
          </div>
        )}
      </div>
    </div>
  );
}
