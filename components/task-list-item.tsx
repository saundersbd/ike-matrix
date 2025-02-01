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
    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200/[.9]">
      <Checkbox />
      <div className="flex grow">
        <div className="grow">
          <p className="text-base leading-snug font-normal">{title}</p>
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
