"use client";

import { cn } from "@/lib/utils";
import { useNewTaskDialog } from "@/components/workspace-content";
import { Task } from "@/app/types/Task";
import { Button } from "@/components/ui/button";
import { Ellipsis, Archive, HelpCircle, Circle, Plus } from "lucide-react";
import { Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { NewTaskItem } from "./lists/new-task-item";
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
    <div className="flex flex-col gap-5 p-9 pb-0 bg-zinc-50 rounded-2xl">
      <header className="flex shrink-0 items-center justify-between">
        <h2 className="text-xl font-semibold">{quadrant.title}</h2>
        <Button
          variant="ghost"
          size="icon-lg"
          className="text-zinc-700 hover:bg-zinc-200/40 hover:text-zinc-800"
        >
          <Plus className="size-5" />
        </Button>
      </header>
      <div className="flex flex-col flex-1 gap-3">
        {tasks.map((task) => (
          <NewTaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
