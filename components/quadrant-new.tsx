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
    <div className="@container/quadrant flex flex-col bg-zinc-100 rounded-xl overflow-hidden relative">
      <header className="flex shrink-0 items-center justify-between pl-6 @max-6xl/main:pl-5.5 pr-4 @max-6xl/main:pt-4 pt-4 pb-4 bg-zinc-800/[.98]">
        <h2 className="text-xl font-semibold text-zinc-100">
          {quadrant.title}
        </h2>
        <Button
          variant="ghost"
          size="icon-lg"
          className="text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
        >
          <Plus className="size-5" />
        </Button>
      </header>
      <ScrollArea className="flex flex-col flex-1 bg-zinc-100" type="auto">
        <div className="flex flex-col flex-1 py-5 @max-6xl/main:py-4 @4xl/main:pb-12 px-5 @max-6xl/main:px-3">
          {tasks.map((task) => (
            <NewTaskItem key={task.id} task={task} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
