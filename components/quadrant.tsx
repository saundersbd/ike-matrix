"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/pill";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { Plus, Maximize2, Eye, EyeClosed } from "lucide-react";
import { THEME_COLORS, THEME_COLORS_LIST, ThemeName } from "@/app/types/Theme";

interface QuadrantProps {
  title: string;
  taskCount: number;
  children?: React.ReactNode;
  theme: ThemeName;
  onMaximize?: () => void;
}

export function Quadrant({ title, taskCount, children, theme }: QuadrantProps) {
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const { bgColor, textColor, iconColor, fillColor, hoverColor } = themeColors;

  const [isHidden, setIsHidden] = useState(false);

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden ring-1 ring-black/[.08] transition-all duration-300 ${
        isHidden ? "shadow-none" : "shadow-sm"
      }`}
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
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", hoverColor)}
              >
                <Plus className={iconColor} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", hoverColor)}
              >
                <Maximize2 className={iconColor} />
              </Button>
              <Toggle
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8",
                  hoverColor,
                  isHidden ? "hover:data-[state=on]:bg-zinc-100" : ""
                )}
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? (
                  <EyeClosed
                    className={isHidden ? "text-zinc-500" : iconColor}
                  />
                ) : (
                  <Eye className={isHidden ? "text-zinc-500" : iconColor} />
                )}
              </Toggle>
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
            <Button variant="outline" size="sm" className="rounded-lg">
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        )}
      </div>
      <div
        className={`absolute inset-0 z-20 opacity-100 animate-in fade-in slide-in-from-top fade-out zoom-out-75 duration-500 ease-out flex flex-col grow items-center justify-center bg-zinc-50 ${
          isHidden ? "" : "hidden opacity-50"
        }`}
      >
        <Button
          variant="ghost"
          className="h-auto w-auto rounded-2xl px-6 py-4 hover:bg-zinc-200/[.5]"
          onClick={() => setIsHidden(!isHidden)}
          aria-label={isHidden ? "Show tasks" : "Hide tasks"}
        >
          <EyeClosed className="!h-14 !w-14 text-zinc-500" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
