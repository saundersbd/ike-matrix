export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  quadrant: number;
  createdOn: string;
  updatedOn?: string;
  completed: boolean;
  status: "todo" | "doing" | "done";
}
