import { ThemeName } from "./CustomTheme";
import { Quadrant } from "./Quadrant";
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  dueTime?: Date;
  quadrant: Quadrant;
  createdAt: Date;
  updatedAt?: Date;
  completed: boolean;
  status: "todo" | "doing" | "done";
  context?: string;
  tags?: string[];
  theme?: ThemeName;
  isCompletionTransitioning?: boolean;
  projectId?: string;
  isArchived?: boolean;
}
