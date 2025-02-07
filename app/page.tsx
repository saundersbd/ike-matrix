"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useTasks } from "@/hooks/use-tasks";
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

import { AppSidebar } from "@/components/layout/app_sidebar/app-sidebar";
import { Quadrant } from "@/components/quadrant";
import { TaskListTableRow } from "@/components/lists/task-list-table-row";
import { NewTaskDialog } from "@/components/dialogs/new-task-dialog";
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
import {
  CUSTOM_THEME_COLORS,
  ThemeName as CustomThemeName,
} from "@/app/types/CustomTheme";

import { Project } from "@/app/types/Project";
import { TaskList } from "@/components/lists/task-list";
import { cn } from "@/lib/utils";
import StopLight from "@/components/controls/stop-light";
import ViewSwitcher from "@/components/controls/view-switcher";
import { QUADRANTS } from "@/app/types/Quadrant";
// Create a safe useLayoutEffect that falls back to useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("task");

  const [view, setView] = useState<"grid" | "list">("grid");
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
  const visibleQuadrantCount = visibilityControls.filter(
    (quadrant) => !quadrant
  ).length;
  const [defaultDestination, setDefaultDestination] = useState(0);

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

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem("preferredView", newView);
  };

  // Don't render content until we've checked localStorage
  if (isLoading) {
    return null; // or a loading spinner if you prefer
  }

  const handleFilterReset = () => {
    setActiveProject(undefined);
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
        `grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100svh-184px)] ${
          open ? "md:px-4" : "md:px-0"
        }`,
        "h-[calc(100svh-200px)]",
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
          visibleQuadrantCount === 3 && "row-span-2",
          visibleQuadrantCount === 2 && "row-span-1"
        )}
        setIsNewTaskDialogOpen={(open) => {
          setNewTaskDialog({
            isOpen: open,
            destinationQuadrant: 1, // Use the passed quadrantId, fallback to 1
          });
        }}
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
        setIsNewTaskDialogOpen={(open) => {
          setNewTaskDialog({
            isOpen: open,
            destinationQuadrant: 2, // Use the passed quadrantId, fallback to 1
          });
        }}
      />
      <Quadrant
        quadrant={QUADRANTS[3]}
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant.id === 3 &&
            (!task.completed || task.isCompletionTransitioning)
        )}
        hidden={visibilityControls[2]}
        setIsNewTaskDialogOpen={(open) => {
          setNewTaskDialog({
            isOpen: open,
            destinationQuadrant: 3, // Use the passed quadrantId, fallback to 1
          });
        }}
      />
      <Quadrant
        quadrant={QUADRANTS[4]}
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant.id === 4 &&
            (!task.completed || task.isCompletionTransitioning)
        )}
        hidden={visibilityControls[3]}
        setIsNewTaskDialogOpen={(open) => {
          setNewTaskDialog({
            isOpen: open,
            destinationQuadrant: 4, // Use the passed quadrantId, fallback to 1
          });
        }}
      />
    </div>
  );

  const listView = (sortBy: string) => (
    <div className="max-w-4xl mx-auto py-2 px-4 flex flex-col h-[calc(100svh-(var(--header-height)+82px))]">
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
          <header className="sticky top-0 mb-0 flex shrink-0 items-center justify-between gap-4 h-[calc(var(--header-height))] bg-white px-8 border-b border-zinc-200/70">
            <SidebarTrigger className="flex items-center gap-2">
              <Switch
                checked={open}
                onCheckedChange={(checked) => setOpen(checked)}
              />
              <Label>{open ? "Hide" : "Show"} backlog</Label>
            </SidebarTrigger>

            <div className="flex items-center gap-3">
              {activeProject && (
                <Button
                  variant="link"
                  size="sm"
                  className="mr-2 underline decoration-dotted decoration-1 decoration-zinc-700 underline-offset-3 hover:decoration-solid"
                  onClick={handleFilterReset}
                >
                  Clear filters
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    {activeProject === undefined ? (
                      <Tag className="h-4 w-4" />
                    ) : activeProject.icon ? (
                      <activeProject.icon
                        className={`w-4 h-4 ${
                          CUSTOM_THEME_COLORS[
                            (activeProject.theme as CustomThemeName) ??
                              "default"
                          ].iconColor
                        }`}
                      />
                    ) : (
                      <Tag className="h-4 w-4" />
                    )}
                    {activeProject === undefined
                      ? "All projects"
                      : activeProject.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-66">
                  <DropdownMenuRadioGroup
                    value={activeProject?.id}
                    onValueChange={(value) =>
                      setActiveProject(
                        projects.find((project) => project.id === value)
                      )
                    }
                  >
                    {projects.map((project) => (
                      <DropdownMenuRadioItem
                        key={project.id}
                        value={project.id}
                      >
                        {project.icon && (
                          <project.icon
                            className={`w-4 h-4 mr-2 ${
                              CUSTOM_THEME_COLORS[
                                (project.theme as CustomThemeName) ?? "default"
                              ].iconColor
                            }`}
                          />
                        )}
                        {project.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Sort by:{" "}
                      {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <DropdownMenuRadioItem value="created">
                      Created
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="updated">
                      Last updated
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dueDate">
                      Due date
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="custom">
                      Custom
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <StopLight
                selection={visibilityControls}
                onSelectionChange={setVisibilityControls}
              />

              <ViewSwitcher setView={setView} />

              <Separator
                orientation="vertical"
                className="h-[20px] mx-2 bg-zinc-300"
              />
              <Button
                size="sm"
                className="rounded-lg"
                onClick={() =>
                  setNewTaskDialog((prev) => ({ ...prev, isOpen: true }))
                }
              >
                <Plus className="h-4 w-4" />
                <span>New task</span>
              </Button>
            </div>
          </header>
          <div className="flex flex-1">
            <AppSidebar
              tasks={sortedAndFilteredTasks.filter(
                (task) =>
                  task.quadrant.id === 0 &&
                  (!task.completed || task.isCompletionTransitioning)
              )}
              setIsNewTaskDialogOpen={(open) => {
                setNewTaskDialog({
                  isOpen: open,
                  destinationQuadrant: 0, // Use the passed quadrantId, fallback to 1
                });
              }}
            />
            <SidebarInset
              className={`${open ? "md:mx-5" : "md:mx-8"} md:my-8 md:mr-8`}
            >
              <div className="flex-1 h-full min-h-[calc(100svh-76px-128px)]">
                <div className="h-[calc(100svh-(var(--header-height)+120px))]">
                  <TabsContent value="grid">{gridView(sortBy)}</TabsContent>
                  <TabsContent value="list">{listView(sortBy)}</TabsContent>
                </div>
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
