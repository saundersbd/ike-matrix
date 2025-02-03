"use client";

import { useTasks } from "@/app/contexts/TaskContext";

import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";

export function TaskListTableRow({ task }: { task: Task }) {
  const { updateTask } = useTasks();

  const handleCheckboxChange = (checked: boolean) => {
    updateTask(task.id, { completed: checked });
  };

  return (
    <div className="group flex items-center gap-3 py-3 px-1 transition-all duration-150 border-b border-zinc-200 last:border-b-0">
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="border-zinc-300 group-hover:border-zinc-400"
      />
      <p className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-base leading-snug font-medium">
        {task.title}
      </p>
      <div className="flex">
        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-xs font-semibold font-mono text-zinc-400 group-hover/task-list-item:text-zinc-500">
            {task.dueDate}
          </div>
        )}
      </div>
    </div>
  );
}
