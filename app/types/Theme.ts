export interface Theme {
  bgColor: string;
  textColor: string;
  iconColor: string;
  fillColor: string;
  hoverColor: string;
  accentColor: string;
  washHoverColor: string;
  ringColor: string;
}

export const THEME_COLORS = {
  red: {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-700",
    fillColor: "bg-red-200/60",
    hoverColor: "hover:bg-red-100 hover:data-[state=on]:bg-red-100",
    accentColor: "fill-red-500 text-red-500",
    washHoverColor: "hover:bg-red-100/70",
    ringColor: "ring-red-500/20",
  },
  gray: {
    bgColor: "bg-zinc-100",
    textColor: "text-zinc-800",
    iconColor: "text-zinc-800",
    fillColor: "bg-zinc-300/[.8]",
    hoverColor: "hover:bg-zinc-200 hover:data-[state=on]:bg-zinc-200",
    accentColor: "fill-zinc-500 text-zinc-500",
    washHoverColor: "hover:bg-zinc-200/70",
    ringColor: "ring-zinc-500/25",
  },
  purple: {
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    iconColor: "text-purple-800",
    fillColor: "bg-purple-200/60",
    hoverColor: "hover:bg-purple-100 hover:data-[state=on]:bg-purple-100",
    accentColor: "fill-purple-500 text-purple-500",
    washHoverColor: "hover:bg-purple-200/40",
    ringColor: "ring-purple-500/15",
  },
  sky: {
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    iconColor: "text-sky-700",
    fillColor: "bg-sky-200/60",
    hoverColor: "hover:bg-sky-100 hover:data-[state=on]:bg-sky-100",
    accentColor: "fill-sky-500 text-sky-500",
    washHoverColor: "hover:bg-sky-200/50",
    ringColor: "ring-sky-500/25",
  },
  amber: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    iconColor: "text-amber-800",
    fillColor: "bg-amber-200/60",
    hoverColor: "hover:bg-amber-100 hover:data-[state=on]:bg-amber-100",
    accentColor: "fill-amber-400 text-amber-400",
    washHoverColor: "hover:bg-amber-200/45",
    ringColor: "ring-amber-500/30",
  },
};

export type ThemeName = keyof typeof THEME_COLORS;

export const THEME_COLORS_LIST = Object.keys(THEME_COLORS) as ThemeName[];
