import { useMemo } from "react";
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";

export function useTasks(
  tasks: Task[],
  quadrants: boolean[],
  sortBy: string,
  activeProject?: Project
) {
  return useMemo(() => {
    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
      const matchesProject =
        !activeProject || task.projectId === activeProject.id;
      const matchesQuadrant =
        task.quadrant === 0 || quadrants[task.quadrant - 1];
      return matchesProject && matchesQuadrant;
    });

    // Sort tasks
    return [...filteredTasks].sort((a, b) => {
      switch (sortBy) {
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "updated":
          if (!a.updatedAt) return 1;
          if (!b.updatedAt) return -1;
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default:
          return 0;
      }
    });
  }, [tasks, activeProject, quadrants, sortBy]);
}
