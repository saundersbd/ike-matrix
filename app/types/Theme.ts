export interface Theme {
  bgColor: string;
  textColor: string;
  iconColor: string;
  fillColor: string;
  hoverColor: string;
  accentColor: string;
}

export const THEME_COLORS = {
  red: {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-700",
    fillColor: "bg-red-200",
    hoverColor: "hover:bg-red-100 hover:data-[state=on]:bg-red-100",
    accentColor: "bg-red-500",
  },
  gray: {
    bgColor: "bg-zinc-100",
    textColor: "text-zinc-800",
    iconColor: "text-zinc-800",
    fillColor: "bg-zinc-300/[.8]",
    hoverColor: "hover:bg-zinc-200 hover:data-[state=on]:bg-zinc-200",
    accentColor: "bg-zinc-500",
  },
  teal: {
    bgColor: "bg-teal-50",
    textColor: "text-teal-700",
    iconColor: "text-teal-700",
    fillColor: "bg-teal-100",
    hoverColor: "hover:bg-teal-100 hover:data-[state=on]:bg-teal-100",
    accentColor: "bg-teal-500",
  },
  sky: {
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    iconColor: "text-sky-700",
    fillColor: "bg-sky-200",
    hoverColor: "hover:bg-sky-100 hover:data-[state=on]:bg-sky-100",
    accentColor: "bg-sky-500",
  },
  amber: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    iconColor: "text-amber-800",
    fillColor: "bg-amber-200",
    hoverColor: "hover:bg-amber-100 hover:data-[state=on]:bg-amber-100",
    accentColor: "bg-amber-400",
  },
};

export type ThemeName = keyof typeof THEME_COLORS;

export const THEME_COLORS_LIST = Object.keys(THEME_COLORS) as ThemeName[];
