"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/pill";
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
import { Separator } from "@/components/ui/separator";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { Ellipsis, EyeClosed, Archive, HelpCircle, Circle } from "lucide-react";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";
import { TaskListItem } from "./task-list-item";
import { TaskList } from "./task-list";
interface QuadrantProps {
  quadrant: number;
  title: string;
  children?: React.ReactNode;
  theme: ThemeName;
  hidden?: boolean;
  tasks: Task[];
  onHideChange?: (hidden: boolean) => void;
  className?: string;
}

const backgroundTexture = [
  "background-tiled-1",
  "background-tiled-2",
  "background-tiled-3",
  "background-tiled-4",
];

export function Quadrant({
  title,
  theme,
  quadrant,
  hidden,
  onHideChange,
  tasks,
  className,
}: QuadrantProps) {
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const { bgColor, washHoverColor, accentColor } = themeColors;

  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleHidden = () => {
    onHideChange?.(!hidden);
    if (!hidden) {
      setIsAnimating(true);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  const taskCount = tasks.length;

  return (
    <div
      className={cn(
        "flex flex-col min-h-0 grow gap-2.5 transition-all duration-300",
        hidden && "hidden",
        className
      )}
    >
      <header
        className={`shrink-0 pl-4.5 pr-3 flex items-center justify-between
        `}
      >
        <div className="flex items-center gap-2.5 min-h-8">
          <Circle className={`w-2 h-2 ${accentColor}`} />
          <h2
            className={cn("text-zinc-800", "text-sm font-semibold inline-flex")}
          >
            {title}
          </h2>
          <Pill count={taskCount} theme="subtleGray" />
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
                  {quadrant === 1
                    ? "Do these before you do anything else."
                    : quadrant === 2
                    ? "Schedule these for later, since they are likely to become more urgent as time goes on."
                    : quadrant === 3
                    ? "See if you can delegate these to someone else."
                    : "You can safely delete these or revisit them in the future."}
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
                <ScrollBar orientation="vertical" className="scroll-bar peer" />
                <div className="absolute bottom-0 left-0 right-0 hidden peer-[.scroll-bar]:block h-8 bg-linear-to-t from-black/[.05] to-transparent pointer-events-none"></div>
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
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col grow items-center justify-center",
            backgroundTexture[quadrant - 1],
            bgColor,
            {
              "opacity-100": hidden,
              "opacity-0": !hidden,
              hidden: !hidden && !isAnimating,
            }
          )}
        >
          <Button
            variant="ghost"
            className={`group h-auto w-auto rounded-2xl px-6 py-4 ${washHoverColor}`}
            onClick={handleToggleHidden}
            aria-label={hidden ? "Show tasks" : "Hide tasks"}
          >
            <EyeClosed
              className="!h-14 !w-14 text-zinc-500 group-hover:text-zinc-600 transition-colors duration-200"
              aria-hidden
            />
          </Button>
        </div>
        <NewTaskDialog
          theme={theme}
          defaultDestination={
            quadrant === 1
              ? "Important and urgent"
              : quadrant === 2
              ? "Important but not urgent"
              : quadrant === 3
              ? "Urgent but not important"
              : "Neither urgent nor important"
          }
          variant="fab"
        />
      </div>
    </div>
  );
}
