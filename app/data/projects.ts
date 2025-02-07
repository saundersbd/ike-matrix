import { Project } from "@/app/types/Project";
import {
  Paintbrush,
  Star,
  Heart,
  Bug,
  Hammer,
  Leaf,
  TreePalm,
  Earth,
} from "lucide-react";
export const projects: Project[] = [
  {
    id: "1",
    value: "Project 1",
    name: "Project 1",
    icon: Paintbrush,
    theme: "teal",
  },
  {
    id: "2",
    value: "Project 2",
    name: "Project 2",
    icon: Star,
    theme: "blue",
  },
  {
    id: "3",
    value: "Project 3",
    name: "Project 3",
    icon: Heart,
    theme: "fuchsia",
  },
  {
    id: "4",
    value: "Project 4",
    name: "Project 4",
    icon: Leaf,
    theme: "lime",
  },
  {
    id: "5",
    value: "Project 5",
    name: "Project 5",
    icon: Hammer,
    theme: "orange",
  },
];
