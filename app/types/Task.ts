import { Quadrant } from "./Quadrant";

type BaseTask = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  dueTime?: Date;
  quadrant: Quadrant;
  createdAt: Date;
  updatedAt?: Date;
  status: "todo" | "doing" | "done";
  projectId?: string;
  isArchived?: boolean;
};

type IncompleteTask = BaseTask & {
  completed: false;
  completedAt: undefined;
};

type CompletedTask = BaseTask & {
  completed: true;
  completedAt: Date;
};

export type Task = IncompleteTask | CompletedTask;
