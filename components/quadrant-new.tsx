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
    <div className="@container/quadrant min-w-[21rem] flex flex-col bg-linear-to-b from-zinc-100/80 from-50% to-zinc-100/10 rounded-xl overflow-hidden relative">
      <header className="flex shrink-0 items-center justify-between pl-5 pr-3 pt-3 pb-3">
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
        <div className="flex flex-col flex-1 py-5 pt-0 gap-2 @4xl/main:pb-12 px-3 @max-6xl/main:px-3">
          {tasks.map((task) => (
            <NewTaskItem key={task.id} task={task} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
