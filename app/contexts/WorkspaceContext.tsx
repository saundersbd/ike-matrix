"use client";

import { createContext, useContext, useState } from "react";
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";
import { tasks as initialTasks } from "@/app/data/tasks";
import { projects as initialProjects } from "@/app/data/projects";
interface WorkspaceContextType {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  createTask: (task: Omit<Task, "id">) => void;
  deleteTask: (taskId: string) => void;

  projects: Project[];
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  createProject: (project: Omit<Project, "id">) => void;
  deleteProject: (projectId: string) => void;
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
        task.id === taskId ? { ...task, ...updates } : task
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

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const createProject = (project: Omit<Project, "id">) => {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        ...project,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const deleteProject = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        tasks,
        updateTask,
        createTask,
        deleteTask,
        projects,
        updateProject,
        createProject,
        deleteProject,
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
