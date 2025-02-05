import { ThemeName } from "./CustomTheme";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  quadrant: number;
  createdAt: Date;
  updatedAt?: Date;
  completed: boolean;
  status: "todo" | "doing" | "done";
  context?: string;
  tags?: string[];
  theme?: ThemeName;
  isCompletionTransitioning?: boolean;
  projectId?: string;
}
