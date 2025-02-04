import { Task } from "@/app/types/Task";

export const handleTaskCompletion = async (
  checked: boolean,
  task: Task,
  updateTask: (id: string, updates: Partial<Task>) => void
) => {
  if (checked) {
    // Start the transition
    updateTask(task.id, {
      completed: true,
      isCompletionTransitioning: true,
    });

    // After a short delay, remove the task completely
    await new Promise((resolve) => setTimeout(resolve, 750));
    updateTask(task.id, {
      isCompletionTransitioning: false,
    });
  } else {
    // For unchecking, just update completed state immediately
    updateTask(task.id, {
      completed: false,
      isCompletionTransitioning: false,
    });
  }
};
