import { createContext, useContext, ReactNode, useState } from "react";
import { Project } from "@/app/types/Project";
import { useWorkspace } from "./WorkspaceContext";

interface ProjectContextType {
  selectedProject: Project | null;
  updateProject: (id: string, project: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { projects, updateProject } = useWorkspace();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const value = {
    selectedProject,
    updateProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
