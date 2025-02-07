import { useState, useEffect } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { ProjectProvider } from "@/app/contexts/ProjectContext";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/app/types/Project";

import { ProjectSection } from "./ProjectSection";
import { DueDateSection } from "./DueDateSection";
import { Task } from "@/app/types/Task";

export function DetailsSidebar({ task }: { task: Task }) {
  const { projects } = useWorkspace();

  const [editProjectNamePopoverOpen, setEditProjectNamePopoverOpen] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    projects.find((p) => p.id === task.projectId)
  );

  useEffect(() => {
    setSelectedProject(projects.find((p) => p.id === task.projectId));
  }, [task.projectId, projects]);

  return (
    <ProjectProvider>
      <Sidebar
        side="right"
        collapsible="none"
        className="w-[264px] h-[calc(80svh-64px)] hidden md:flex bg-zinc-50"
      >
        <SidebarContent className="gap-0">
          <ProjectSection task={task} />
          <Separator className="bg-zinc-200/70" />
          <DueDateSection task={task} />
          <Separator className="bg-zinc-200/70" />
        </SidebarContent>
      </Sidebar>
    </ProjectProvider>
  );
}
