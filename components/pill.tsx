import { THEME_COLORS, ThemeName } from "@/app/types/Theme";

export function Pill({
  count,
  theme,
  className,
}: {
  count: number;
  theme: ThemeName;
  className?: string;
}) {
  const { fillColor, textColor } = THEME_COLORS[theme];

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 min-w-7 text-xs font-semibold rounded-full ${fillColor} ${textColor} ${className}`}
    >
      {count}
    </span>
  );
}
