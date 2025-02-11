import { cn } from "@/lib/utils";
import { SortOption } from "@/lib/sort-options";
import { Task } from "@/app/types/Task";

export function SortOptionListItem({
  option,
  dense,
}: {
  option: SortOption<Task>;
  dense?: boolean;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2", dense && "gap-1.75")}>
      <option.icon className={cn("h-4 w-4", dense && "!size-3.5")} />
      <span>{option.label}</span>
    </div>
  );
}
