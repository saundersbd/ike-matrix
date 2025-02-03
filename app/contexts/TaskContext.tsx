"use client";

import { createContext, useContext, useState } from "react";
import { Task } from "@/app/types/Task";
import { tasks as initialTasks } from "@/app/data/tasks";

interface TaskContextType {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  createTask: (task: Omit<Task, "id">) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

  return (
    <TaskContext.Provider value={{ tasks, updateTask, createTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
