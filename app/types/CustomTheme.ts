export interface CustomTheme {
  bgColor: string;
  textColor: string;
  iconColor: string;
  hoverColor: string;
  accentColor: string;
  borderColor: string;
}

export const CUSTOM_THEME_COLORS = {
  teal: {
    bgColor: "bg-teal-100/40",
    textColor: "text-teal-600",
    iconColor: "text-teal-600",
    hoverColor: "hover:bg-teal-100 hover:data-[state=on]:bg-teal-100",
    accentColor: "fill-teal-500 text-teal-500",
    borderColor: "border border-teal-500/40",
  },
};

export type ThemeName = keyof typeof CUSTOM_THEME_COLORS;

export const CUSTOM_THEME_COLORS_LIST = Object.keys(
  CUSTOM_THEME_COLORS
) as ThemeName[];
