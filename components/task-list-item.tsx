import { Flag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskListItemProps {
  title: string;
  description: string;
  date?: string;
  quadrant?: number;
  status?: "open" | "in-progress" | "completed";
  tags?: string[];
}

export function TaskListItem({ title, description, date }: TaskListItemProps) {
  return (
    <div className="group flex items-center gap-3 py-2.5 px-3.5 rounded-lg hover:bg-zinc-50 hover:cursor-grab">
      <Checkbox className="border-zinc-300 group-hover:border-zinc-400" />
      <p className="grow peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400 text-base leading-snug font-medium">
        {title}
      </p>
      <div className="flex">
        {date && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-400">
            <Flag size={13} />
            {date}
          </div>
        )}
      </div>
    </div>
  );
}
