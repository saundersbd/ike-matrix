import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/Task";

import { Flag } from "lucide-react";

export function BacklogListItem({ task }: { task: Task }) {
  return (
    <div className="group/list-item flex items-start gap-3 py-2.5 px-3.5 rounded-lg hover:bg-zinc-100/[.75] hover:cursor-grab transition-all duration-150">
      <div className="peer flex items-center justify-center pt-0.5">
        <Checkbox className="border-zinc-300 group-hover/list-item:border-zinc-400" />
      </div>
      <div className="flex flex-col gap-1 peer-has-data-[state=checked]:line-through peer-has-data-[state=checked]:text-zinc-400">
        <p className="grow text-base leading-snug font-medium">{task.title}</p>
        <div className="flex">
          {task.dueDate && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover/list-item:text-zinc-500">
              {task.dueDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
