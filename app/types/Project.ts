import { ThemeName } from "@/app/types/CustomTheme";
import { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  icon?: LucideIcon;
  value: string;
  theme?: ThemeName;
}
