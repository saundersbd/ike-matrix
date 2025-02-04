import { Circle, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";

interface QuadrantSelectOptionProps {
  label: {
    value: string | null;
    theme: ThemeName;
  };
  type: "quadrant" | "backlog";
  padding?: "dense" | "normal";
}

export function QuadrantSelectOption({
  label,
  type,
  padding = "normal",
}: QuadrantSelectOptionProps) {
  const { accentColor } = THEME_COLORS[label.theme];

  return (
    <div
      className={cn(
        "flex flex-row items-center",
        padding === "dense" && type === "quadrant"
          ? "!gap-0.25 -ml-1"
          : "gap-2",
        padding === "dense" && type === "backlog" ? "!gap-1" : "gap-2"
      )}
    >
      <div className="flex w-5 h-5 items-center justify-center">
        {type === "quadrant" && (
          <Circle className={`!w-[8px] !h-[8px] ${accentColor}`} />
        )}
        {type === "backlog" && <List className="!w-4 !h-4" />}
      </div>
      <span className="leading-snug text-sm">{label.value}</span>
    </div>
  );
}
