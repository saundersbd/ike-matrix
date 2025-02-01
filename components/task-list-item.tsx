import { Flag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";

export function TaskListItem({ task }: { task: Task }) {
  return (
    <div className="group flex items-center gap-3 py-2.5 px-3.5 rounded-lg hover:bg-zinc-100/[.75] hover:cursor-grab transition-all duration-150">
      <Checkbox className="border-zinc-300 group-hover:border-zinc-400" />
      <p className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-base leading-snug font-medium">
        {task.title}
      </p>
      <div className="flex">
        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover:text-zinc-500">
            <Flag size={13} />
            {task.dueDate}
          </div>
        )}
      </div>
    </div>
  );
}
