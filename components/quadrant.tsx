import { cn } from "@/lib/utils";
import { Pill } from "@/components/pill";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, ZoomIn } from "lucide-react";
import { THEME_COLORS, THEME_COLORS_LIST, ThemeName } from "@/app/types/Theme";

interface QuadrantProps {
  title: string;
  taskCount: number;
  children?: React.ReactNode;
  theme: ThemeName;
}

export function Quadrant({ title, taskCount, children, theme }: QuadrantProps) {
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const { bgColor, textColor, iconColor, fillColor, hoverColor } = themeColors;

  return (
    <div className="flex flex-col rounded-2xl shadow-sm overflow-hidden ring-1 ring-black/[.08]">
      <header
        className={`shrink-0 py-3 pl-5 pr-4 flex items-center justify-between ${bgColor}`}
      >
        <div className="flex items-center gap-2">
          <h2 className={cn(textColor, "text-sm font-semibold inline-flex")}>
            {title}
          </h2>
          <Pill count={taskCount} theme={theme} />
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", hoverColor)}
          >
            <ZoomIn className={iconColor} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", hoverColor)}
          >
            <Plus className={iconColor} />
          </Button>
        </div>
      </header>
      <div className="flex flex-col grow">
        {taskCount > 0 ? (
          <ScrollArea className="grow px-3 bg-white">
            <div className="flex flex-col gap-0 py-4">{children}</div>
          </ScrollArea>
        ) : (
          <div className="flex grow items-center justify-center gap-0 py-4 bg-white">
            <p className="text-zinc-400 text-sm font-medium text-center">
              No tasks to speak of.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
