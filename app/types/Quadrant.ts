export interface Quadrant {
  id: number;
  title: string;
  description: string;
  color: string;
  theme: (typeof QUADRANT_THEMES)[keyof typeof QUADRANT_THEMES];
}

export const QUADRANT_THEMES = {
  Backlog: {
    bgColor: "bg-zinc-100",
    textColor: "text-zinc-800",
    iconColor: "text-zinc-800",
    fillColor: "bg-zinc-300/[.8]",
    hoverColor: "hover:bg-zinc-200 hover:data-[state=on]:bg-zinc-200",
    accentColor: "fill-zinc-500 text-zinc-500",
    washHoverColor: "hover:bg-zinc-200/70",
    ringColor: "ring-zinc-500/25",
    separatorColor: "bg-zinc-300/50",
  },
  "Quadrant 1": {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-700",
    fillColor: "bg-red-200/60",
    hoverColor: "hover:bg-red-100 hover:data-[state=on]:bg-red-100",
    accentColor: "fill-red-500 text-red-500",
    washHoverColor: "hover:bg-red-100/70",
    ringColor: "ring-red-500/20",
    separatorColor: "bg-red-300/60",
  },
  "Quadrant 2": {
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    iconColor: "text-amber-800",
    fillColor: "bg-amber-200/60",
    hoverColor: "hover:bg-amber-100 hover:data-[state=on]:bg-amber-100",
    accentColor: "fill-amber-400 text-amber-400",
    washHoverColor: "hover:bg-amber-200/45",
    ringColor: "ring-amber-500/30",
    separatorColor: "bg-amber-300/65",
  },
  "Quadrant 3": {
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    iconColor: "text-sky-700",
    fillColor: "bg-sky-200/60",
    hoverColor: "hover:bg-sky-100 hover:data-[state=on]:bg-sky-100",
    accentColor: "fill-sky-500 text-sky-500",
    washHoverColor: "hover:bg-sky-200/50",
    ringColor: "ring-sky-500/25",
    separatorColor: "bg-sky-300/60",
  },
  "Quadrant 4": {
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    iconColor: "text-purple-800",
    fillColor: "bg-purple-200/60",
    hoverColor: "hover:bg-purple-100 hover:data-[state=on]:bg-purple-100",
    accentColor: "fill-purple-500 text-purple-500",
    washHoverColor: "hover:bg-purple-200/40",
    ringColor: "ring-purple-500/15",
    separatorColor: "bg-purple-300/65",
  },
};

export const QUADRANTS: Quadrant[] = [
  {
    id: 0,
    title: "Backlog",
    description: "Tasks that need to be done",
    color: "bg-gray-500",
    theme: QUADRANT_THEMES.Backlog,
  },
  {
    id: 1,
    title: "Urgent and important",
    description: "Tasks that are important and urgent",
    color: "bg-red-500",
    theme: QUADRANT_THEMES["Quadrant 1"],
  },
  {
    id: 2,
    title: "Important but not urgent",
    description: "Tasks that are important but not urgent",
    color: "bg-yellow-500",
    theme: QUADRANT_THEMES["Quadrant 2"],
  },
  {
    id: 3,
    title: "Urgent but not important",
    description: "Tasks that are not important but urgent",
    color: "bg-blue-500",
    theme: QUADRANT_THEMES["Quadrant 3"],
  },
  {
    id: 4,
    title: "Neither important nor urgent",
    description: "Tasks that are neither important nor urgent",
    color: "bg-green-500",
    theme: QUADRANT_THEMES["Quadrant 4"],
  },
];
