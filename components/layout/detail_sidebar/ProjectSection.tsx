import { Task } from "@/app/types/Task";
import { useProjectManagement } from "@/hooks/use-project-management";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { ProjectPicker } from "./ProjectPicker";
import { ProjectActionsMenu } from "./ProjectActionsMenu";
export function ProjectSection({ task }: { task: Task }) {
  const { projects } = useWorkspace();
  const {
    selectedProject,
    setSelectedProject,
    editingName,
    setEditingName,
    theme,
    handleNameChange,
    handleThemeChange,
    handleClearProject,
  } = useProjectManagement(projects.find((p) => p.id === task.projectId));

  return (
    <SidebarGroup className="p-3 pt-5 gap-1.5">
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <div className="flex items-center gap-2">
        <ProjectPicker
          selectedProject={selectedProject}
          onProjectSelect={setSelectedProject}
          task={task}
        />
        {selectedProject && (
          <ProjectActionsMenu
            project={selectedProject}
            onNameChange={handleNameChange}
            onThemeChange={handleThemeChange}
            onDelete={handleClearProject}
          />
        )}
      </div>
    </SidebarGroup>
  );
}
