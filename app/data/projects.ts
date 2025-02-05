import { Project } from "@/app/types/Project";
import { Home, Paintbrush } from "lucide-react";
export const projects: Project[] = [
  {
    id: "1",
    value: "Project 1",
    name: "Project 1",
    description: "Project 1 description",
    icon: Paintbrush,
    theme: "teal",
  },
  {
    id: "2",
    value: "Project 2",
    name: "Project 2",
    description: "Project 2 description",
    icon: Home,
  },
  {
    id: "3",
    value: "Project 3",
    name: "Project 3",
    description: "Project 3 description",
    icon: Home,
  },
];
