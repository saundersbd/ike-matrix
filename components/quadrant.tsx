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
import { Ellipsis, EyeClosed, Archive, HelpCircle } from "lucide-react";
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
}: QuadrantProps) {
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const {
    bgColor,
    textColor,
    iconColor,
    hoverColor,
    washHoverColor,
    ringColor,
    separatorColor,
  } = themeColors;

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
      data-hidden={hidden}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden ring-1 h-full shadow-sm",
        "data-[hidden=true]:shadow-none",
        {
          [ringColor]: hidden,
          "ring-black/[.08]": !hidden,
        }
      )}
    >
      <header
        className={`shrink-0 py-3 px-4 flex items-center justify-between ${
          hidden ? "bg-white/[.35]" : bgColor
        }`}
      >
        <div className="flex items-center gap-2.5 min-h-8">
          <Pill
            count={taskCount}
            theme={theme}
            className={hidden ? "bg-zinc-200 text-zinc-800" : ""}
          />
          <h2
            className={cn(
              hidden ? "text-zinc-600" : textColor,
              "text-sm font-semibold inline-flex"
            )}
          >
            {title}
          </h2>
        </div>
        <div className="flex items-center">
          {hidden ? null : (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8", hoverColor)}
                  >
                    <HelpCircle className={`w-4 h-4 ${iconColor}`} />
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
                    className={cn("h-8 w-8", hoverColor)}
                  >
                    <Ellipsis className={`w-4 h-4 ${iconColor}`} />
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

      <div className="flex flex-col min-h-0 grow bg-white">
        {taskCount > 0 ? (
          <ScrollArea className="h-full">
            <TaskList className="p-5">
              {tasks.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </TaskList>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        ) : (
          <div className="flex flex-col grow items-center justify-center gap-3 py-4 bg-white">
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
      <Popover>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="w-76 text-sm" dark>
          <p>
            This is a help text. It will be used to explain the quadrant and its
            purpose.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
