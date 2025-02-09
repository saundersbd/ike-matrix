"use client";

import { Circle } from "lucide-react";

import { useState, useEffect, useLayoutEffect } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useTasks, useTaskSortOptions } from "@/hooks/use-tasks";

import { Button } from "@/components/ui/button";

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
import { Plus } from "lucide-react";
import { NewTaskDialog } from "@/components/dialogs/new-task-dialog";
import { ViewSwitcher } from "@/components/controls/view-switcher";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { TaskListTableRow } from "@/components/lists/task-list-table-row";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";
import { TaskList } from "@/components/lists/task-list";
import { Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { Task } from "@/app/types/Task";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

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

  const listView = (sortBy: string) => (
    <div className="py-8 px-1 flex flex-col">
      {visibilityControls.every((q) => q) ? (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <span className="text-sm text-gray-500 text-center">
            All quadrants are hidden. Use the &ldquo;Show&rdquo; filter to
            display tasks.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() => setVisibilityControls([false, false, false, false])}
          >
            Bring &apos;em back
          </Button>
        </div>
      ) : (
        [1, 2, 3, 4].map((quadrantNumber) => {
          if (visibilityControls[quadrantNumber - 1]) return null;

          const quadrantTasks = tasks.filter(
            (task) =>
              task.quadrant.id === quadrantNumber &&
              (!task.completed || task.isCompletionTransitioning)
          );

          return quadrantTasks.length > 0 ? (
            <div key={quadrantNumber} className="mb-7 last:mb-0">
              <div className="flex items-center justify-between mb-3.5 mx-5">
                <div className="flex items-center gap-2.5">
                  <Circle
                    className={`w-[8px] h-[8px] ${QUADRANTS[quadrantNumber].theme.accentColor}`}
                  />
                  <h3 className="text-sm font-semibold text-zinc-500">
                    {QUADRANTS[quadrantNumber].title}
                  </h3>
                </div>
              </div>

              <div className="ring-1 ring-black/[.05] rounded-2xl bg-white shadow-xs">
                <TaskList gap={false} className="px-5 py-3">
                  {quadrantTasks.map((task) => (
                    <TaskListTableRow key={task.id} task={task} />
                  ))}
                </TaskList>
              </div>
            </div>
          ) : (
            <div key={quadrantNumber} className="mb-6 last:mb-0">
              <div className="flex items-center justify-between mb-2.5 mx-4">
                <div className="flex items-center gap-2.5">
                  <Circle
                    className={`w-[8px] h-[8px] ${QUADRANTS[quadrantNumber].theme.accentColor}`}
                  />
                  <h3 className="text-sm font-medium text-gray-500">
                    {QUADRANTS[quadrantNumber].title}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg"
                  onClick={() =>
                    setNewTaskDialog((prev) => ({
                      ...prev,
                      isOpen: true,
                      destinationQuadrant: quadrantNumber,
                    }))
                  }
                >
                  <Plus className="h-4 w-4" />
                  New task
                </Button>
              </div>
              <div className="flex items-center justify-center p-7 ring-1 ring-black/[.08] rounded-xl bg-white/50">
                <span className="text-sm text-gray-500 text-center">
                  No tasks
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

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
            <div className="flex items-center gap-3">
              <FilterChip<SortOption<Task>>
                label="created date"
                options={TASK_SORT_OPTIONS}
                onApplyFilter={(option) => setSortBy(option.id)}
                onResetFilter={() => setSortBy("created")}
                itemNode={(option) => <SortOptionListItem option={option} />}
                behavior="sort"
                getItemId={(option) => option.id}
                getDisplayValue={(option) => option.label}
                value={TASK_SORT_OPTIONS.find((option) => option.id === sortBy)}
                defaultValue={TASK_SORT_OPTIONS.find(
                  (option) => option.id === "created"
                )}
              />
              <Separator
                orientation="vertical"
                className="h-5 mx-2 bg-zinc-200"
              />
              <ViewSwitcher
                setView={(view) => {
                  console.log(view);
                }}
              />
            </div>
          </header>
          <ScrollArea className="h-[calc(100svh-3.5rem)]">
            <div
              className={cn(
                "flex flex-col p-6 container mx-auto",
                view === "list" ? "max-w-4xl" : "max-w-6xl"
              )}
            >
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
              <TabsContent value="list">{listView(sortBy)}</TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SidebarInset>
    </SidebarProvider>
  );
}
