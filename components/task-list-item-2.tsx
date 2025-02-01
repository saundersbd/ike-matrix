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

export function TaskListItemTwo({
  title,
  description,
  date,
}: TaskListItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox />
      <div className="flex grow py-2.5 border-b border-zinc-200/[.75]">
        <div className="grow">
          <p className="text-base leading-snug font-normal">{title}</p>
          {/* <p className="text-sm text-zinc-500">Description of the task</p> */}
        </div>
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
