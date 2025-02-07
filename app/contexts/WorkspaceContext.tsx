"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Task } from "@/app/types/Task";
import { Quadrant } from "@/app/types/Quadrant";
import { Project } from "@/app/types/Project";
import { tasks as initialTasks } from "@/app/data/tasks";
import { projects as initialProjects } from "@/app/data/projects";

interface WorkspaceContextType {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  createTask: (task: Omit<Task, "id">) => void;
  deleteTask: (taskId: string) => void;

  projects: Project[];
  createProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;

  getTasksByQuadrant: (quadrant: Quadrant) => Task[];
  getTasksByProject: (projectId: string) => Task[];
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const createTask = (task: Omit<Task, "id">) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...task,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const createProject = useCallback((project: Project) => {
    const newProject: Project = {
      ...project,
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, []);

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const getTasksByQuadrant = useCallback(
    (quadrant: Quadrant) => {
      return tasks.filter((task) => task.quadrant === quadrant);
    },
    [tasks]
  );

  const getTasksByProject = useCallback(
    (projectId: string) => {
      return tasks.filter((task) => task.projectId === projectId);
    },
    [tasks]
  );

  return (
    <WorkspaceContext.Provider
      value={{
        tasks,
        updateTask,
        createTask,
        deleteTask,
        projects,
        createProject,
        updateProject,
        deleteProject,
        getTasksByQuadrant,
        getTasksByProject,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
