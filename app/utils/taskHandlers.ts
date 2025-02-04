import { Task } from "@/app/types/Task";

export const handleTaskCompletion = async (
  checked: boolean,
  task: Task,
  updateTask: (id: string, updates: Partial<Task>) => void
) => {
  // Update UI immediately, but mark as transitioning
  updateTask(task.id, { completed: checked, isCompletionTransitioning: true });

  if (checked) {
    // Then wait before finalizing the state
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateTask(task.id, { isCompletionTransitioning: false });
  }
};
