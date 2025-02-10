"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Task } from "@/app/types/Task";
import { Quadrant } from "@/app/types/Quadrant";
import { Project } from "@/app/types/Project";
import { tasks as initialTasks } from "@/app/data/tasks";
import { projects as initialProjects } from "@/app/data/projects";

import {
  CodeXml,
  Heart,
  Leaf,
  LucideIcon,
  Paintbrush,
  Star,
  TreePalm,
  Earth,
  Bug,
  Hammer,
} from "lucide-react";

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

  sortProjectsByTasksCount: (projectsToSort?: Project[]) => Project[];
  getActiveProjects: (projectsToFilter?: Project[]) => Project[];

  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [sortBy, setSortBy] = useState("dueDate");

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
    const randomIcon = () => {
      const icons = [
        Star,
        Paintbrush,
        Heart,
        Leaf,
        TreePalm,
        Earth,
        Bug,
        Hammer,
        CodeXml,
      ];
      return icons[Math.floor(Math.random() * icons.length)];
    };

    const newProject: Project = {
      ...project,
      icon: randomIcon(),
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

  const sortProjectsByTasksCount = useCallback(
    (projectsToSort?: Project[]) => {
      const projectsArray = projectsToSort || projects;
      return [...projectsArray].sort((a, b) => {
        return getTasksByProject(b.id).length - getTasksByProject(a.id).length;
      });
    },
    [projects, getTasksByProject]
  );

  const getActiveProjects = useCallback(
    (projectsToFilter?: Project[]) => {
      const projectsArray = projectsToFilter || projects;
      return projectsArray.filter((project) => {
        const projectTasks = getTasksByProject(project.id);
        return projectTasks.length > 0;
      });
    },
    [projects, getTasksByProject]
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
        sortProjectsByTasksCount,
        getActiveProjects,
        sortBy,
        setSortBy,
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
