import { cn } from "@/lib/utils";

import { useProjectManagement } from "@/hooks/use-project-management";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { Project } from "@/app/types/Project";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";
import { Pencil } from "lucide-react";

interface ProjectTileProps {
  project: Project;
}

export function ProjectTile({ project }: ProjectTileProps) {
  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
    getTasksByProject,
  } = useWorkspace();
  const {
    selectedProject,
    setSelectedProject,
    editingName,
    setEditingName,
    theme,
    handleNameChange,
    handleThemeChange,
  } = useProjectManagement(project);

  return (
    <button className="group/project-tile relative flex ring-1 ring-black/[.08] rounded-xl shadow-xs gap-3.5 overflow-hidden cursor-pointer">
      <div className="flex flex-col gap-2.5 p-3 align-start">
        {project.icon && (
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              CUSTOM_THEME_COLORS[project.theme || "default"].washColor
            )}
          >
            <project.icon
              className={cn(
                "w-5 h-5",
                CUSTOM_THEME_COLORS[project.theme || "default"].iconColor
              )}
            />
          </div>
        )}
        <div className="flex flex-col items-start">
          <span className="text-base font-medium">{project.name}</span>
          <span className="text-sm text-zinc-500">
            {getTasksByProject(project.id).length === 1
              ? "1 task"
              : `${getTasksByProject(project.id).length} tasks`}
          </span>
        </div>
      </div>
      <div className="opacity-0 group-hover/project-tile:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center bg-zinc-800/90 text-zinc-50 gap-2">
        <Pencil className="w-4 h-4" />
        <span className="text-sm font-semibold">Edit</span>
      </div>
    </button>
  );
}
