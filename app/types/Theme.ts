export interface Theme {
  bgColor: string;
  textColor: string;
  iconColor: string;
  fillColor: string;
  hoverColor: string;
}

export const THEME_COLORS = {
  red: {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-700",
    fillColor: "bg-red-200",
    hoverColor: "hover:bg-red-100",
  },
  gray: {
    bgColor: "bg-zinc-50",
    textColor: "text-zinc-800",
    iconColor: "text-zinc-800",
    fillColor: "bg-zinc-200",
    hoverColor: "hover:bg-zinc-100",
  },
  teal: {
    bgColor: "bg-teal-50",
    textColor: "text-teal-700",
    iconColor: "text-teal-700",
    fillColor: "bg-teal-100",
    hoverColor: "hover:bg-teal-100",
  },
  sky: {
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    iconColor: "text-sky-700",
    fillColor: "bg-sky-200",
    hoverColor: "hover:bg-sky-100",
  },
  amber: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    iconColor: "text-amber-800",
    fillColor: "bg-amber-200",
    hoverColor: "hover:bg-amber-100",
  },
};

export type ThemeName = keyof typeof THEME_COLORS;

export const THEME_COLORS_LIST = Object.keys(THEME_COLORS) as ThemeName[];
