import { useMemo } from "react";
import { Task } from "@/app/types/Task";
import { TASK_SORT_OPTIONS } from "@/lib/sort-options";

export type TaskFilterOptions = {
  showCompleted?: boolean;
  showArchived?: boolean;
  projectId?: string | null;
  quadrantId?: number | null;
  completedOnly?: boolean;
};

export function useTasks(
  tasks: Task[],
  sortBy: string,
  filters: TaskFilterOptions = {}
) {
  return useMemo(() => {
    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
      // Handle completed tasks filtering
      const completedMatch = filters.completedOnly
        ? task.completed // Show only completed tasks
        : filters.showCompleted
        ? true
        : !task.completed; // Normal completed filtering

      // Only filter archived if specified
      const archivedMatch = filters.showArchived ? true : !task.isArchived;

      // Filter by project if specified
      const projectMatch = filters.projectId
        ? task.projectId === filters.projectId
        : true;

      const quadrantMatch =
        filters.quadrantId !== null
          ? task.quadrant.id === filters.quadrantId
          : true;

      return completedMatch && archivedMatch && projectMatch && quadrantMatch;
    });

    // Find the selected sort option
    const sortOption = TASK_SORT_OPTIONS.find((option) => option.id === sortBy);
    if (!sortOption) return filteredTasks; // Return unsorted if no valid option

    // Sort tasks based on the selected option
    return [...filteredTasks].sort((a, b) => {
      switch (sortOption.id) {
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        // case "priority":
        //   // Assuming higher number = higher priority
        //   return b.priority - a.priority;
        case "dueDate":
          // Handle tasks without deadlines
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default:
          return 0;
      }
    });
  }, [tasks, filters, sortBy]);
}

// You could also expose the sort options from the hook if needed
export function useTaskSortOptions() {
  return TASK_SORT_OPTIONS;
}
