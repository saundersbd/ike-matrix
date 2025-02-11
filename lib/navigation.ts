import {
  Grid2x2,
  Inbox,
  History,
  LucideIcon,
  OctagonAlert,
} from "lucide-react";

type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  subItems?: {
    path: string;
    label: string;
    theme: string;
  }[];
};

export const navigationItems: Record<string, NavItem> = {
  prioritizedTasks: {
    label: "Eisenhower matrix",
    path: "/",
    icon: Grid2x2,
    subItems: [
      {
        path: "/q/1",
        label: "Urgent & important",
        theme: "!text-red-400 fill-red-400",
      },
      {
        path: "/q/2",
        label: "Important & not urgent",
        theme: "!text-amber-300 fill-amber-300",
      },
      {
        path: "/q/3",
        label: "Urgent & not important",
        theme: "!text-sky-400 fill-sky-400",
      },
      {
        path: "/q/4",
        label: "Not urgent or important",
        theme: "!text-purple-400 fill-purple-400",
      },
    ],
  },
  urgent: {
    label: "Urgent & important",
    path: "/urgent",
    icon: OctagonAlert,
  },
  inbox: {
    label: "Inbox",
    path: "/inbox",
    icon: Inbox,
  },
  history: {
    label: "History",
    path: "/history",
    icon: History,
  },
};
