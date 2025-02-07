"use client";

import { useState } from "react";
import { useProjectManagement } from "@/hooks/use-project-management";
import { ProjectProvider } from "@/app/contexts/ProjectContext";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { DialogHeader } from "@/components/layout/dialog-header";
import { ProjectTile } from "@/components/project-tile";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ManageProjectsDialogProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function ManageProjectsDialog({
  isOpen,
  onOpenChange,
}: ManageProjectsDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
    getTasksByProject,
  } = useWorkspace();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const listView = (
    <div className="flex flex-col gap-5 p-5">
      {projects.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <span>No projects.</span>
      )}
    </div>
  );

  return (
    <ProjectProvider>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="flex flex-col p-0 overflow-y-auto max-h-[70svh] max-w-4xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogTitle>
            <DialogHeader title="Manage projects" />
          </DialogTitle>
          <div className="flex flex-col flex-1 min-h-[256px] max-h-[calc(70svh-64px)]">
            <ScrollArea className="h-full">{listView}</ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </ProjectProvider>
  );
}
