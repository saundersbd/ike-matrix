"use client";

import { useState } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useTasks, useTaskSortOptions } from "@/hooks/use-tasks";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { SlimSidebar } from "@/components/layout/slim_sidebar/slim-sidebar";
import { Quadrant } from "@/components/quadrant";
import { cn } from "@/lib/utils";
import { QUADRANTS } from "@/app/types/Quadrant";
import { Project } from "@/app/types/Project";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { ProjectListItem } from "@/components/controls/filtering/project-list-item";
import { ViewSwitcher } from "@/components/controls/view-switcher";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Alt() {
  const [sortBy, setSortBy] = useState("created");
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  );
  const [view, setView] = useState<"grid" | "list" | "columns">("grid");

  const handleViewChange = (newView: "grid" | "list" | "columns") => {
    setView(newView);
    localStorage.setItem("preferredView", newView);
  };

  const { tasks, projects } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, activeProject);

  const [visibilityControls, setVisibilityControls] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [open, setOpen] = useState(true);

  const [newTaskDialog, setNewTaskDialog] = useState<{
    isOpen: boolean;
    destinationQuadrant: number;
  }>({
    isOpen: false,
    destinationQuadrant: 0,
  });

  const handleOpenNewTaskDialog = (quadrantId: number) => {
    setNewTaskDialog({
      isOpen: true,
      destinationQuadrant: quadrantId,
    });
  };

  const visibleQuadrantCount = visibilityControls.filter(
    (quadrant) => !quadrant
  ).length;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
        } as React.CSSProperties
      }
    >
      <SlimSidebar />
      <SidebarInset className="bg-white/50">
        <Tabs
          value={view}
          onValueChange={(value) => handleViewChange(value as "grid" | "list")}
        >
          <header className="flex h-14 px-5 shrink-0 items-center justify-between bg-white/90 border-b border-zinc-200/50">
            <SidebarTrigger />
            <ViewSwitcher
              setView={(view) => {
                console.log(view);
              }}
            />
          </header>
          <div className="flex flex-col container max-w-6xl mx-auto p-6">
            <TabsContent value="grid">
              <div className="flex flex-1 flex-col">
                <div className="h-[calc(100svh-6.5rem)] grid grid-cols-2 grid-rows-2 gap-6">
                  <Quadrant
                    quadrant={QUADRANTS[1]}
                    tasks={sortedAndFilteredTasks.filter(
                      (task) =>
                        task.quadrant.id === 1 &&
                        (!task.completed || task.isCompletionTransitioning)
                    )}
                    hidden={visibilityControls[0]}
                    className={cn(
                      visibleQuadrantCount === 3 && "row-span-2",
                      visibleQuadrantCount === 2 && "row-span-1"
                    )}
                    handleOpenNewTaskDialog={handleOpenNewTaskDialog}
                  />
                  <Quadrant
                    quadrant={QUADRANTS[2]}
                    tasks={sortedAndFilteredTasks.filter(
                      (task) =>
                        task.quadrant.id === 2 &&
                        (!task.completed || task.isCompletionTransitioning)
                    )}
                    hidden={visibilityControls[1]}
                    className={cn(
                      visibilityControls[0] &&
                        !visibilityControls[1] &&
                        !visibilityControls[2] &&
                        !visibilityControls[3] &&
                        "row-span-2"
                    )}
                    handleOpenNewTaskDialog={handleOpenNewTaskDialog}
                  />
                  <Quadrant
                    quadrant={QUADRANTS[3]}
                    tasks={sortedAndFilteredTasks.filter(
                      (task) =>
                        task.quadrant.id === 3 &&
                        (!task.completed || task.isCompletionTransitioning)
                    )}
                    hidden={visibilityControls[2]}
                    handleOpenNewTaskDialog={handleOpenNewTaskDialog}
                  />
                  <Quadrant
                    quadrant={QUADRANTS[4]}
                    tasks={sortedAndFilteredTasks.filter(
                      (task) =>
                        task.quadrant.id === 4 &&
                        (!task.completed || task.isCompletionTransitioning)
                    )}
                    hidden={visibilityControls[3]}
                    handleOpenNewTaskDialog={handleOpenNewTaskDialog}
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SidebarInset>
    </SidebarProvider>
  );
}
