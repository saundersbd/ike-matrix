import { THEME_COLORS, ThemeName } from "@/app/types/Theme";

export function Pill({
  label,
  theme,
  className,
}: {
  label: string;
  theme: ThemeName;
  className?: string;
}) {
  const { fillColor, textColor } = THEME_COLORS[theme];

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 min-w-7 text-xs font-bold rounded-full ${fillColor} ${textColor} ${className}`}
    >
      {label}
    </span>
  );
}
