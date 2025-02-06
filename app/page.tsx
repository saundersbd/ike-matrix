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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { AppSidebar } from "@/components/app-sidebar";
import { Quadrant } from "@/components/quadrant";
import { TaskListTableRow } from "@/components/task-list-table-row";
import { NewTaskDialog } from "@/components/new-task-dialog";
import {
  ArrowUpDown,
  ChevronDown,
  Circle,
  Filter,
  Grid2X2,
  List,
  Tag,
} from "lucide-react";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";
import {
  CUSTOM_THEME_COLORS,
  ThemeName as CustomThemeName,
} from "@/app/types/CustomTheme";

import { Project } from "@/app/types/Project";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { TaskList } from "@/components/task-list";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

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
      if (!isNewTaskDialogOpen) {
        setIsNewTaskDialogOpen(true);
      }
    },
    {
      enableOnFormTags: true,
    },
    [isNewTaskDialogOpen]
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
        quadrant={1}
        title="Important and urgent"
        theme="red"
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant === 1 &&
            (!task.completed || task.isCompletionTransitioning)
        )}
        hidden={visibilityControls[0]}
        className={cn(
          visibleQuadrantCount === 3 && "row-span-2",
          visibleQuadrantCount === 2 && "row-span-1"
        )}
      />
      <Quadrant
        quadrant={2}
        title="Important but not urgent"
        theme="amber"
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant === 2 &&
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
      />
      <Quadrant
        quadrant={3}
        title="Urgent but not important"
        theme="sky"
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant === 3 &&
            (!task.completed || task.isCompletionTransitioning)
        )}
        hidden={visibilityControls[2]}
      />
      <Quadrant
        quadrant={4}
        title="Neither urgent nor important"
        theme="purple"
        tasks={sortedAndFilteredTasks.filter(
          (task) =>
            task.quadrant === 4 &&
            (!task.completed || task.isCompletionTransitioning)
        )}
        hidden={visibilityControls[3]}
      />
    </div>
  );

  const listView = (quadrants: boolean[], sortBy: string) => (
    <div className="max-w-4xl mx-auto py-2 px-4 flex flex-col h-[calc(100svh-(var(--header-height)+82px))]">
      {!quadrants.some((q) => q) ? (
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
        [1, 3, 2, 4].map((quadrantNumber) => {
          if (!quadrants[quadrantNumber - 1]) return null;

          const quadrantTasks = sortedAndFilteredTasks.filter(
            (task) =>
              task.quadrant === quadrantNumber &&
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
                  theme="subtleGray"
                  defaultDestination={
                    quadrantNumber === 1
                      ? "Important and urgent"
                      : quadrantNumber === 2
                      ? "Important but not urgent"
                      : quadrantNumber === 3
                      ? "Urgent but not important"
                      : "Neither urgent nor important"
                  }
                  variant="inline"
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
                <NewTaskDialog
                  theme="gray"
                  defaultDestination={
                    quadrantNumber === 1
                      ? "Important and urgent"
                      : quadrantNumber === 2
                      ? "Important but not urgent"
                      : quadrantNumber === 3
                      ? "Urgent but not important"
                      : "Neither urgent nor important"
                  }
                  variant="inline"
                />
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

  const focusedQuadrantLabel = (quadrant: string) => {
    // Get the quadrant number by finding the matching title
    const quadrantNumber = Object.entries(quadrantTitles).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([num, title]) => title === quadrant
    )?.[0];

    // Use the corresponding theme color, or default to gray for "All quadrants"
    const themeColor = quadrantNumber
      ? THEME_COLORS[quadrantThemes[parseInt(quadrantNumber)]]
      : THEME_COLORS.gray;

    return (
      <div className="flex items-center gap-1.5">
        <Circle className={`!w-[8px] !h-[8px] ${themeColor.accentColor}`} />
        {quadrant}
      </div>
    );
  };

  return (
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

            <ToggleGroup
              type="multiple"
              className="h-9 ring-1 ring-zinc-200 bg-white rounded-lg gap-0"
              value={visibilityControls
                .map((control, index) => (control ? index.toString() : null))
                .filter((value): value is string => value !== null)}
              onValueChange={(value) =>
                setVisibilityControls(
                  [0, 1, 2, 3].map((i) => value.includes(i.toString()))
                )
              }
            >
              <ToggleGroupItem value="0" size="sm">
                <Circle
                  className={cn(
                    "!w-[12px] !h-[12px] fill-red-500 text-red-500",
                    visibilityControls[0] && "fill-white"
                  )}
                />
              </ToggleGroupItem>
              <ToggleGroupItem value="1" size="sm">
                <Circle
                  className={cn(
                    "!w-[12px] !h-[12px] fill-amber-400 text-amber-400",
                    visibilityControls[1] && "fill-white"
                  )}
                />
              </ToggleGroupItem>
              <ToggleGroupItem value="2" size="sm">
                <Circle
                  className={cn(
                    "!w-[12px] !h-[12px] fill-sky-500 text-sky-500",
                    visibilityControls[2] && "fill-white"
                  )}
                />
              </ToggleGroupItem>
              <ToggleGroupItem value="3" size="sm">
                <Circle
                  className={cn(
                    "!w-[12px] !h-[12px] fill-purple-500 text-purple-500",
                    visibilityControls[3] && "fill-white"
                  )}
                />
              </ToggleGroupItem>
            </ToggleGroup>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-lg">
                  {activeProject === undefined ? (
                    <Tag className="h-4 w-4" />
                  ) : activeProject.icon ? (
                    <activeProject.icon
                      className={`w-4 h-4 ${
                        CUSTOM_THEME_COLORS[
                          (activeProject.theme as CustomThemeName) ?? "default"
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
                    <DropdownMenuRadioItem key={project.id} value={project.id}>
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
                    Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
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

            <TabsList className="bg-zinc-200/[.75] rounded-lg">
              <TabsTrigger
                value="grid"
                className="rounded-md"
                onClick={() => setView("grid")}
              >
                <Grid2X2 className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="rounded-md"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
            <Separator
              orientation="vertical"
              className="h-[20px] mx-2 bg-zinc-300"
            />
            <NewTaskDialog
              defaultDestination="Backlog"
              isOpen={isNewTaskDialogOpen}
              onOpenChange={setIsNewTaskDialogOpen}
            />
          </div>
        </header>
        <div className="flex flex-1">
          <AppSidebar
            tasks={sortedAndFilteredTasks.filter(
              (task) =>
                task.quadrant === 0 &&
                (!task.completed || task.isCompletionTransitioning)
            )}
          />
          <SidebarInset
            className={`${open ? "md:mx-5" : "md:mx-8"} md:my-8 md:mr-8`}
          >
            <div className="flex-1 h-full min-h-[calc(100svh-76px-128px)]">
              <div className="h-[calc(100svh-(var(--header-height)+120px))]">
                <TabsContent value="grid">{gridView(sortBy)}</TabsContent>
                <TabsContent value="list">
                  {listView(visibilityControls, sortBy)}
                </TabsContent>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Tabs>
  );
}
