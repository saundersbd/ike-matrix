import { Task } from "@/app/types/Task";
import { LucideIcon } from "lucide-react";
import { CalendarCheck2, History, ArrowUpDown } from "lucide-react";
export interface SortOption<T> {
  id: string;
  label: string;
  icon: LucideIcon;
  getValue: (item: T) => number;
}

export const TASK_SORT_OPTIONS: SortOption<Task>[] = [
  {
    id: "created",
    label: "Created date",
    icon: ArrowUpDown,
    getValue: (task) => new Date(task.createdAt).getTime(),
  },
  {
    id: "dueDate",
    label: "Due date",
    icon: CalendarCheck2,
    getValue: (task) => (task.dueDate ? new Date(task.dueDate).getTime() : 0),
  },
];
