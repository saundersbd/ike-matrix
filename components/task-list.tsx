import { cn } from "@/lib/utils";

interface TaskListProps {
  children: React.ReactNode;
  className?: string;
}

export function TaskList({ children, className }: TaskListProps) {
  return (
    <div className={cn("grid grid-cols-1 auto-rows-max gap-4", className)}>
      {children}
    </div>
  );
}
