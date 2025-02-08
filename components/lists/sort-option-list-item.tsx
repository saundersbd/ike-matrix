import { SortOption } from "@/lib/sort-options";
import { Task } from "@/app/types/Task";

export function SortOptionListItem({ option }: { option: SortOption<Task> }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <option.icon className="h-4 w-4" />
      <span>{option.label}</span>
    </div>
  );
}
