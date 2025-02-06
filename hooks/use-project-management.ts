import { useState, useCallback } from "react";
import { Project } from "@/app/types/Project";
import { ThemeName } from "@/app/types/CustomTheme";
import { useProject } from "@/app/contexts/ProjectContext";

export function useProjectManagement(initialProject?: Project) {
  const { updateProject } = useProject();
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    initialProject
  );
  const [editingName, setEditingName] = useState("");
  const [theme, setTheme] = useState<ThemeName>(
    initialProject?.theme ?? "default"
  );

  const handleProjectUpdate = useCallback(
    (updates: Partial<Project>) => {
      if (!selectedProject) return;

      const updatedProject = {
        ...selectedProject,
        ...updates,
      };

      updateProject(selectedProject.id, updatedProject);
      setSelectedProject(updatedProject);
    },
    [selectedProject, updateProject]
  );

  const handleNameChange = useCallback(
    (newName: string) => {
      handleProjectUpdate({ name: newName });
    },
    [handleProjectUpdate]
  );

  const handleThemeChange = useCallback(
    (newTheme: ThemeName) => {
      setTheme(newTheme);
      handleProjectUpdate({ theme: newTheme });
    },
    [handleProjectUpdate]
  );

  const handleClearProject = useCallback(() => {
    setSelectedProject(undefined);
  }, []);

  return {
    selectedProject,
    setSelectedProject,
    editingName,
    setEditingName,
    theme,
    handleNameChange,
    handleThemeChange,
    handleClearProject,
  };
}
