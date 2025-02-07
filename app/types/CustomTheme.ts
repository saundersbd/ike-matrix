export interface CustomTheme {
  bgColor: string;
  textColor: string;
  iconColor: string;
  hoverColor: string;
  accentColor: string;
  borderColor: string;
  washColor: string;
}

export const CUSTOM_THEME_COLORS = {
  teal: {
    bgColor: "bg-teal-100/40",
    textColor: "text-teal-700",
    iconColor: "text-teal-600",
    hoverColor: "hover:bg-teal-100 hover:data-[state=on]:bg-teal-100",
    accentColor: "fill-teal-500 text-teal-500 bg-teal-400",
    borderColor: "border border-teal-500/40",
    washColor: "bg-teal-100/50",
  },
  blue: {
    bgColor: "bg-blue-100/40",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
    hoverColor: "hover:bg-blue-100 hover:data-[state=on]:bg-blue-100",
    accentColor: "fill-blue-500 text-blue-500 bg-blue-400",
    borderColor: "border border-blue-500/40",
    washColor: "bg-blue-50",
  },
  fuchsia: {
    bgColor: "bg-fuchsia-100/40",
    textColor: "text-fuchsia-700",
    iconColor: "text-fuchsia-600",
    hoverColor: "hover:bg-fuchsia-100 hover:data-[state=on]:bg-fuchsia-100",
    accentColor: "fill-fuchsia-500 text-fuchsia-500 bg-fuchsia-400",
    borderColor: "border border-fuchsia-500/40",
    washColor: "bg-fuchsia-50",
  },
  lime: {
    bgColor: "bg-lime-100/40",
    textColor: "text-lime-600",
    iconColor: "text-lime-600",
    hoverColor: "hover:bg-lime-100 hover:data-[state=on]:bg-lime-100",
    accentColor: "fill-lime-500 text-lime-500 bg-lime-400",
    borderColor: "border border-lime-500/40",
    washColor: "bg-lime-100/80",
  },
  orange: {
    bgColor: "bg-orange-100/40",
    textColor: "text-orange-600",
    iconColor: "text-orange-600",
    hoverColor: "hover:bg-orange-100 hover:data-[state=on]:bg-orange-100",
    accentColor: "fill-orange-500 text-orange-500 bg-orange-400",
    borderColor: "border border-orange-500/40",
    washColor: "bg-orange-100/70",
  },
  default: {
    bgColor: "bg-zinc-100/40",
    textColor: "text-zinc-600",
    iconColor: "text-zinc-600",
    hoverColor: "hover:bg-zinc-100 hover:data-[state=on]:bg-zinc-100",
    accentColor: "fill-zinc-500 text-zinc-500 bg-zinc-400",
    borderColor: "border border-zinc-500/40",
    washColor: "bg-zinc-50",
  },
};

export type ThemeName = keyof typeof CUSTOM_THEME_COLORS;

export const CUSTOM_THEME_COLORS_LIST = Object.keys(
  CUSTOM_THEME_COLORS
) as ThemeName[];
