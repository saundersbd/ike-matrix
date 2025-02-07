import { Project } from "@/app/types/Project";
import { Home, Paintbrush } from "lucide-react";
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
    icon: Home,
  },
  {
    id: "3",
    value: "Project 3",
    name: "Project 3",
    icon: Home,
  },
];
