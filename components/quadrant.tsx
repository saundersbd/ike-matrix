"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/pill";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { Plus, Ellipsis, Eye, EyeClosed, Archive } from "lucide-react";
import { THEME_COLORS, THEME_COLORS_LIST, ThemeName } from "@/app/types/Theme";

interface QuadrantProps {
  quadrant: number;
  title: string;
  taskCount: number;
  children?: React.ReactNode;
  theme: ThemeName;
  onMaximize?: () => void;
}

const backgroundTexture = [
  "background-tiled-1",
  "background-tiled-2",
  "background-tiled-3",
  "background-tiled-4",
];

const quadrantTitles: Record<number, string> = {
  1: "Important and urgent",
  2: "Important but not urgent",
  3: "Urgent but not important",
  4: "Not urgent or important",
};

export function Quadrant({
  title,
  taskCount,
  children,
  theme,
  quadrant,
}: QuadrantProps) {
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const {
    bgColor,
    textColor,
    iconColor,
    fillColor,
    hoverColor,
    washHoverColor,
    ringColor,
  } = themeColors;

  const [isHidden, setIsHidden] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleHidden = () => {
    if (!isHidden) {
      setIsAnimating(true);
      setIsHidden(true);
    } else {
      setIsHidden(false);
      // Add a delay that matches your animation duration
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // 1000ms = duration-1000
    }
  };

  return (
    <div
      data-hidden={isHidden}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden ring-1 transition-all duration-300",
        "data-[hidden=true]:shadow-none data-[hidden=false]:shadow-sm",
        {
          [ringColor]: isHidden,
          "ring-black/[.08]": !isHidden,
        }
      )}
    >
      <header
        className={`shrink-0 py-3 pl-5 pr-4 flex items-center justify-between ${
          isHidden ? "bg-white/[.35]" : bgColor
        }`}
      >
        <div className="flex items-center gap-2 min-h-8">
          <h2
            className={cn(
              isHidden ? "text-zinc-600" : textColor,
              "text-sm font-semibold inline-flex"
            )}
          >
            {title}
          </h2>
          <Pill
            count={taskCount}
            theme={theme}
            className={isHidden ? "bg-zinc-200 text-zinc-800" : ""}
          />
        </div>
        <div className="flex items-center">
          {isHidden ? null : (
            <>
              <NewTaskDialog
                theme={theme}
                defaultDestination={
                  quadrant === 0
                    ? "Important and urgent"
                    : quadrant === 1
                    ? "Important but not urgent"
                    : quadrant === 2
                    ? "Urgent but not important"
                    : "Not urgent or important"
                }
                inlineTrigger
              />
              <Toggle
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8",
                  hoverColor,
                  isHidden ? "hover:data-[state=on]:bg-zinc-100" : ""
                )}
                onClick={handleToggleHidden}
              >
                {isHidden ? (
                  <EyeClosed
                    className={isHidden ? "text-zinc-500" : iconColor}
                  />
                ) : (
                  <Eye className={isHidden ? "text-zinc-500" : iconColor} />
                )}
              </Toggle>
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
      <div className={`flex flex-col grow`}>
        {taskCount > 0 ? (
          <ScrollArea className="grow px-3 bg-white">
            <div className="flex flex-col gap-0 py-4">{children}</div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col grow items-center justify-center gap-5 py-4 bg-white">
            <p className="text-zinc-500 text-sm font-medium text-center">
              No tasks to speak of.
            </p>
            <NewTaskDialog
              theme={theme}
              defaultDestination={
                quadrant === 0
                  ? "Important and urgent"
                  : quadrant === 1
                  ? "Important but not urgent"
                  : quadrant === 2
                  ? "Urgent but not important"
                  : "Not urgent or important"
              }
              buttonVariant="outline"
            />
          </div>
        )}
      </div>
      <div
        className={cn(
          "absolute opacity-0 inset-0 z-20 flex flex-col grow items-center justify-center transition-all duration-200 ease-in-out",
          backgroundTexture[quadrant],
          bgColor,
          {
            "animate-in fade-in zoom-in-75 opacity-100": isHidden,
            "animate-out fade-out zoom-out-75 opacity-0": !isHidden,
            hidden: !isHidden && !isAnimating,
          }
        )}
      >
        <Button
          variant="ghost"
          className={`group h-auto w-auto rounded-2xl px-6 py-4 ${washHoverColor}`}
          onClick={handleToggleHidden}
          aria-label={isHidden ? "Show tasks" : "Hide tasks"}
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
