import { cn } from "@/lib/utils";

interface TaskListProps {
  children: React.ReactNode;
  className?: string;
  gap?: boolean;
}

export function TaskList({ children, className, gap = true }: TaskListProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 auto-rows-max",
        gap ? "gap-[0.8rem]" : "gap-0",
        className
      )}
    >
      {children}
    </div>
  );
}
