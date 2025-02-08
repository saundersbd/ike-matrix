"use client";

import { cn } from "@/lib/utils";
import { Pill } from "@/components/common/pill";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Task } from "@/app/types/Task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, Archive, HelpCircle, Circle, Plus } from "lucide-react";
import { TaskListItem } from "./lists/task-list-item";
import { TaskList } from "./lists/task-list";
import { Quadrant as QuadrantType } from "@/app/types/Quadrant";

interface QuadrantProps {
  quadrant: QuadrantType;
  children?: React.ReactNode;
  hidden?: boolean;
  tasks: Task[];
  handleOpenNewTaskDialog: (quadrantId: number) => void;
  className?: string;
}

export function Quadrant({
  quadrant,
  hidden,
  tasks,
  className,
  handleOpenNewTaskDialog,
}: QuadrantProps) {
  const taskCount = tasks.length;

  return (
    <div
      className={cn(
        "flex flex-col min-h-0 gap-2.5 transition-all duration-300 scroll-snap-start",
        hidden && "hidden",
        className
      )}
    >
      <header
        className={`shrink-0 pl-4.5 pr-3 flex items-center justify-between
        `}
      >
        <div className="flex items-center gap-2.5 min-h-8">
          <Circle className={`w-2 h-2 ${quadrant.theme.accentColor}`} />
          <h2
            className={cn("text-zinc-800", "text-sm font-semibold inline-flex")}
          >
            {quadrant.title}
          </h2>
          <Pill label={taskCount.toString()} theme="subtleGray" />
        </div>
        <div className="flex items-center">
          {hidden ? null : (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 hover:bg-zinc-200/40 text-zinc-600 hover:text-zinc-800"
                    )}
                  >
                    <HelpCircle className={`w-4 h-4`} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-76 text-sm" dark>
                  {quadrant.description}
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 hover:bg-zinc-200/40 text-zinc-600 hover:text-zinc-800"
                    )}
                  >
                    <Ellipsis className={`w-4 h-4`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4" />
                    Archive all
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </header>
      <div
        data-hidden={hidden}
        className={cn(
          "group relative flex flex-col rounded-2xl overflow-hidden h-full"
        )}
      >
        <div className="relative flex flex-col min-h-0 grow">
          {taskCount > 0 ? (
            <div className="h-full bg-zinc-200/50">
              <ScrollArea
                type="auto"
                className="has-data-[state=visible]:pr-2 relative h-full"
              >
                <TaskList className="p-4 peer/task-list">
                  {tasks.map((task) => (
                    <TaskListItem key={task.id} task={task} />
                  ))}
                </TaskList>
                <div className="absolute bottom-0 left-0 right-0 hidden group-has-data-[orientation=vertical]:block group-[.scroll-bottom]:hidden h-8 bg-linear-to-t from-black/[.05] to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 hidden group-[.scroll-container]:block h-8 bg-linear-to-b from-black/[.05] to-transparent pointer-events-none"></div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col grow items-center justify-center gap-3 py-4 bg-zinc-100/60 border border-dashed border-zinc-300/60 rounded-2xl">
              <p className="text-zinc-400 text-sm font-medium text-center">
                No tasks to speak of.
              </p>
            </div>
          )}
        </div>
        <Button
          size="fab"
          variant="secondary"
          className="absolute bottom-5 right-5"
          onClick={() => handleOpenNewTaskDialog(quadrant.id)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
