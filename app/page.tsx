"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useTasks, useTaskSortOptions } from "@/hooks/use-tasks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { AppSidebar } from "@/components/layout/app_sidebar/app-sidebar";
import { Quadrant } from "@/components/quadrant";
import { TaskListTableRow } from "@/components/lists/task-list-table-row";
import { NewTaskDialog } from "@/components/dialogs/new-task-dialog";
import { ProjectListItem } from "@/components/controls/filtering/project-list-item";
import {
  ArrowUpDown,
  ChevronDown,
  Circle,
  Grid2X2,
  List,
  Plus,
  Tag,
} from "lucide-react";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";

import { Project } from "@/app/types/Project";
import { TaskList } from "@/components/lists/task-list";
import { cn } from "@/lib/utils";
import StopLight from "@/components/controls/stop-light";
import ViewSwitcher from "@/components/controls/view-switcher";
import { QUADRANTS } from "@/app/types/Quadrant";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { Task } from "@/app/types/Task";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

// Create a safe useLayoutEffect that falls back to useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("task");

  const [view, setView] = useState<"grid" | "list" | "columns">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created");
  const [visibilityControls, setVisibilityControls] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [open, setOpen] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  );
  const { tasks, projects } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, activeProject);

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

  useEffect(() => {
    if (taskId) {
      // This will trigger the intercepted route in @modal
      router.push(`/task/${taskId}`, { scroll: false });
    }
  }, [taskId, router]);

  useIsomorphicLayoutEffect(() => {
    const savedView = localStorage.getItem("preferredView") as "grid" | "list";
    if (savedView) {
      setView(savedView);
    }
    setIsLoading(false);
  }, []);

  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      if (!newTaskDialog.isOpen) {
        setNewTaskDialog((prev) => ({ ...prev, isOpen: true }));
      }
    },
    {
      enableOnFormTags: true,
    },
    [newTaskDialog.isOpen]
  );

  const handleViewChange = (newView: "grid" | "list" | "columns") => {
    setView(newView);
    localStorage.setItem("preferredView", newView);
  };

  // Don't render content until we've checked localStorage
  if (isLoading) {
    return null; // or a loading spinner if you prefer
  }

  const handleFilterReset = () => {
    setActiveProject(undefined);
    setSortBy("created");
    setVisibilityControls([false, false, false, false]);
  };

  const quadrantTitles: Record<number, string> = {
    1: "Important and urgent",
    2: "Important but not urgent",
    3: "Urgent but not important",
    4: "Neither urgent nor important",
  };

  const quadrantThemes: Record<number, ThemeName> = {
    1: "red",
    2: "amber",
    3: "sky",
    4: "purple",
  };

  const gridView = (sortBy: string) => (
    <div
      className={cn(
        "grid gap-6 grid-cols-2 grid-rows-2 h-svh pt-[95px] pb-8 px-8",
        (visibleQuadrantCount === 2 || visibleQuadrantCount === 1) &&
          "grid-rows-1"
      )}
    >
      <Quadrant
        quadrant={QUADRANTS[1]}
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant.id === 1 &&
            (!task.completed || task.isCompletionTransitioning)
        )}
        hidden={visibilityControls[0]}
        className={cn(
          view === "columns" && " shrink-0 w-[45%]",
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
          view === "columns" && " shrink-0 w-[45%]",
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
        className={cn(view === "columns" && "shrink-0 w-[45%]")}
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
        className={cn(view === "columns" && "shrink-0 w-[45%]")}
      />
    </div>
  );

  const listView = (sortBy: string) => (
    <div className="px-1.5 pt-[65px]">
      <div className="max-w-4xl mx-auto py-12 px-0 flex flex-col">
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
              onClick={() =>
                setVisibilityControls([false, false, false, false])
              }
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
              <div key={quadrantNumber} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-2.5 mx-4">
                  <div className="flex items-center gap-2.5">
                    <Circle
                      className={`w-[8px] h-[8px] ${
                        THEME_COLORS[quadrantThemes[quadrantNumber]].accentColor
                      }`}
                    />
                    <h3 className="text-sm font-medium text-gray-500">
                      {quadrantTitles[quadrantNumber]}
                    </h3>
                  </div>
                  <NewTaskDialog
                    defaultDestination={QUADRANTS[quadrantNumber]}
                    isOpen={newTaskDialog.isOpen}
                    onOpenChange={(open) =>
                      setNewTaskDialog((prev) => ({ ...prev, isOpen: open }))
                    }
                  />
                </div>

                <div className="ring-1 ring-black/[.08] rounded-2xl bg-white shadow-xs">
                  <TaskList gap={false} className="px-5 py-4">
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
                      className={`w-[8px] h-[8px] ${
                        THEME_COLORS[quadrantThemes[quadrantNumber]].accentColor
                      }`}
                    />
                    <h3 className="text-sm font-medium text-gray-500">
                      {quadrantTitles[quadrantNumber]}
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
    </div>
  );

  return (
    <>
      <Tabs
        value={view}
        onValueChange={(value) => handleViewChange(value as "grid" | "list")}
      >
        <SidebarProvider
          open={open}
          onOpenChange={setOpen}
          className="flex flex-col"
        >
          <div className="relative flex flex-1 w-[calc(100vw-64px)]">
            <AppSidebar
              tasks={sortedAndFilteredTasks.filter(
                (task) =>
                  task.quadrant.id === 0 &&
                  (!task.completed || task.isCompletionTransitioning)
              )}
              handleOpenNewTaskDialog={handleOpenNewTaskDialog}
            />
            <SidebarInset
              className={cn(
                "md:my-0 md:mx-0 z-10",
                view === "grid" && open && "md:mr-0",
                view === "list" && "md:my-0 md:mr-0",
                view === "list" && !open && "md:ml-0"
              )}
            >
              <div className="relative h-svh">
                <header className="z-20 absolute left-0 top-0 right-0 mb-0 flex shrink-0 items-center justify-center gap-4 pt-8 pl-8 pr-5 pb-[18px]">
                  <div className="flex items-center gap-3">
                    {activeProject && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-8 mr-2 underline decoration-dotted decoration-1 decoration-zinc-700 underline-offset-3 hover:decoration-solid animate-in fade-in-0 duration-200"
                        onClick={handleFilterReset}
                      >
                        Clear filters
                      </Button>
                    )}

                    {/* <FilterChip
                      label="projects"
                      options={projects}
                      onApplyFilter={(project) => setActiveProject(project)}
                      onResetFilter={() => setActiveProject(undefined)}
                      itemNode={(project) => (
                        <ProjectListItem project={project} dense />
                      )}
                      behavior="radio"
                      getItemId={(project) => project.id}
                      getDisplayValue={(project) => project.name}
                      value={activeProject}
                    />

                    <FilterChip<SortOption<Task>>
                      label="created date"
                      options={TASK_SORT_OPTIONS}
                      onApplyFilter={(option) => setSortBy(option.id)}
                      onResetFilter={() => setSortBy("created")}
                      itemNode={(option) => (
                        <SortOptionListItem option={option} />
                      )}
                      behavior="sort"
                      getItemId={(option) => option.id}
                      getDisplayValue={(option) => option.label}
                      value={TASK_SORT_OPTIONS.find(
                        (option) => option.id === sortBy
                      )}
                      defaultValue={TASK_SORT_OPTIONS.find(
                        (option) => option.id === "created"
                      )}
                    /> */}

                    <StopLight
                      selection={visibilityControls}
                      onSelectionChange={setVisibilityControls}
                      onToggleChange={(toggle) => {
                        setOpen(toggle);
                      }}
                    />

                    <ViewSwitcher setView={setView} />
                  </div>
                </header>
                <TabsContent value="grid" className="h-svh">
                  {gridView(sortBy)}
                </TabsContent>
                <TabsContent value="list">
                  <ScrollArea className="px-12 !overflow-visible h-svh">
                    {listView(sortBy)}
                  </ScrollArea>
                </TabsContent>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </Tabs>

      <NewTaskDialog
        defaultDestination={QUADRANTS[newTaskDialog.destinationQuadrant]}
        isOpen={newTaskDialog.isOpen}
        onOpenChange={(open) =>
          setNewTaskDialog((prev) => ({ ...prev, isOpen: open }))
        }
      />
    </>
  );
}
