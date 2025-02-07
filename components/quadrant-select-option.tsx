import { Circle, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { QUADRANTS, QUADRANT_THEMES } from "@/app/types/Quadrant";
import { Quadrant } from "@/app/types/Quadrant";

interface QuadrantSelectOptionProps {
  quadrant: Quadrant;
  isBacklog?: boolean;
  padding?: "dense" | "normal";
}

export function QuadrantSelectOption({
  quadrant,
  isBacklog = false,
  padding = "normal",
}: QuadrantSelectOptionProps) {
  const quadrantTitle = quadrant.title;
  const theme = quadrant.theme;

  return (
    <div
      className={cn(
        "flex flex-row items-center",
        padding === "dense" && !isBacklog ? "!gap-0.25 -ml-1" : "gap-2",
        padding === "dense" && isBacklog ? "!gap-1" : "gap-2"
      )}
    >
      <div className="flex w-5 h-5 items-center justify-center">
        {!isBacklog && (
          <Circle className={`!w-[8px] !h-[8px] ${theme.accentColor}`} />
        )}
        {isBacklog && <List className={`!w-4 !h-4 ${theme.iconColor}`} />}
      </div>
      <span className={`leading-snug text-sm`}>{quadrantTitle}</span>
    </div>
  );
}
