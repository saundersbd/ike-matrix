"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/pill";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/app/types/Task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { Ellipsis, EyeClosed, Archive } from "lucide-react";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";
import { TaskListItem } from "./task-list-item";

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
  const tasksToDisplay = tasks.filter(
    (task) => !task.completed || task.isCompletionTransitioning
  );

  return (
    <div
      data-hidden={hidden}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden ring-1 transition-all duration-300",
        "data-[hidden=true]:shadow-none data-[hidden=false]:shadow-sm",
        {
          [ringColor]: hidden,
          "ring-black/[.08]": !hidden,
        }
      )}
    >
      <header
        className={`shrink-0 py-3 pl-5 pr-4 flex items-center justify-between ${
          hidden ? "bg-white/[.35]" : bgColor
        }`}
      >
        <div className="flex items-center gap-2 min-h-8">
          <h2
            className={cn(
              hidden ? "text-zinc-600" : textColor,
              "text-sm font-semibold inline-flex"
            )}
          >
            {title}
          </h2>
          <Pill
            count={taskCount}
            theme={theme}
            className={hidden ? "bg-zinc-200 text-zinc-800" : ""}
          />
        </div>
        <div className="flex items-center">
          {hidden ? null : (
            <>
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
                inlineTrigger
              />
              <Separator
                orientation="vertical"
                className={`mx-2 h-4 ${separatorColor}`}
              />
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
      <div
        className={`flex flex-col grow transition-all duration-300 bg-white`}
      >
        {tasksToDisplay.length > 0 ? (
          <ScrollArea className="grow px-3 bg-white">
            <div className="grid grid-cols-1 auto-rows-max gap-0 py-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    task.completed &&
                      !task.isCompletionTransitioning && [
                        "h-0",
                        "opacity-0",
                        "overflow-hidden",
                        "transform-gpu",
                        "-translate-y-full",
                      ]
                  )}
                >
                  <TaskListItem task={task} />
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col grow items-center justify-center gap-6 py-4 bg-white animate-in fade-in opacity-100 duration-300">
            <p className="text-zinc-400 text-sm font-medium text-center">
              No tasks to speak of.
            </p>
          </div>
        )}
      </div>
      <div
        className={cn(
          "absolute opacity-0 inset-0 z-20 flex flex-col grow items-center justify-center transition-all duration-200 ease-in-out",
          backgroundTexture[quadrant - 1],
          bgColor,
          {
            "animate-in fade-in zoom-in-75 opacity-100": hidden,
            "animate-out fade-out zoom-out-75 opacity-0": !hidden,
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
    </div>
  );
}
