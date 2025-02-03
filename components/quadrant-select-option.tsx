import { Inbox } from "lucide-react";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";

interface QuadrantSelectOptionProps {
  label: string;
  theme?: ThemeName;
  type: "quadrant" | "backlog";
  padding?: "dense" | "normal";
}

export function QuadrantSelectOption({
  label,
  theme,
  type,
  padding = "normal",
}: QuadrantSelectOptionProps) {
  const themeColors = theme ? THEME_COLORS[theme] : THEME_COLORS.sky;
  const { accentColor } = themeColors;

  return (
    <div
      className={`flex flex-row items-center ${
        padding === "dense" ? "gap-1" : "gap-2"
      }`}
    >
      <div className="flex w-5 h-5 items-center justify-center">
        {type === "quadrant" && (
          <div className={`h-[7px] w-[7px] rounded-full ${accentColor}`}></div>
        )}
        {type === "backlog" && <Inbox className="!w-4 !h-4" />}
      </div>
      <span className="leading-tight">{label}</span>
    </div>
  );
}
