import { useMemo } from "react";
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";
import { TASK_SORT_OPTIONS } from "@/lib/sort-options";

export function useTasks(
  tasks: Task[],
  sortBy: string,
  activeProject?: Project
) {
  return useMemo(() => {
    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
      const matchesProject =
        !activeProject || task.projectId === activeProject.id;
      const matchesArchived = !task.isArchived;
      return matchesProject && matchesArchived;
    });

    // Sort tasks
    return [...filteredTasks].sort((a, b) => {
      const sortOption = TASK_SORT_OPTIONS.find(
        (option) => option.id === sortBy
      );
      if (!sortOption) return 0;

      return sortOption.getValue(b) - sortOption.getValue(a);
    });
  }, [tasks, activeProject, sortBy]);
}

// You could also expose the sort options from the hook if needed
export function useTaskSortOptions() {
  return TASK_SORT_OPTIONS;
}
