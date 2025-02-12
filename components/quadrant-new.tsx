"use client";

import { cn } from "@/lib/utils";
import { useNewTaskDialog } from "@/components/workspace-content";
import { Task } from "@/app/types/Task";
import { Button } from "@/components/ui/button";
import { Ellipsis, Archive, HelpCircle, Circle, Plus } from "lucide-react";
import { Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { NewTaskItem } from "./lists/new-task-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
interface QuadrantProps {
  quadrant: QuadrantType;
  children?: React.ReactNode;
  hidden?: boolean;
  tasks: Task[];
  className?: string;
}

export function QuadrantNew({
  quadrant,
  hidden,
  tasks,
  className,
}: QuadrantProps) {
  const { openNewTaskDialog } = useNewTaskDialog();
  const taskCount = tasks.length;

  const handleNewTask = () => {
    openNewTaskDialog(quadrant);
  };

  return (
    <div className="@container/quadrant flex flex-col bg-white/[.90] rounded-2xl overflow-hidden relative ring-1 ring-stone-900/[.03] shadow-sm">
      <header className="flex shrink-0 items-center justify-between pl-5 @max-6xl/main:pl-5.5 pr-3 @max-6xl/main:pt-4 pt-3 pb-3">
        <h2 className="text-base font-semibold">{quadrant.title}</h2>
        <Button
          variant="ghost"
          size="icon-lg"
          className="text-stone-600 hover:bg-stone-200/70 hover:text-stone-800 rounded-lg"
        >
          <Plus className="size-5" />
        </Button>
      </header>
      <ScrollArea className="flex flex-col flex-1" type="auto">
        <div className="flex flex-col flex-1 py-5 pt-0 @max-6xl/main:py-4 @4xl/main:pb-12 px-3 @max-6xl/main:px-3">
          {tasks.map((task) => (
            <NewTaskItem key={task.id} task={task} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
