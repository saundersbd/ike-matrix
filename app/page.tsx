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
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { TaskList } from "@/components/task-list";

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
  const [quadrants, setQuadrants] = useState([true, true, true, true]);
  const [open, setOpen] = useState(true);
  const [focusedQuadrant, setFocusedQuadrant] = useState("All quadrants");
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  );
  const { tasks, projects } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(
    tasks,
    quadrants,
    sortBy,
    activeProject
  );

  const [isQuadrant1Hidden, setIsQuadrant1Hidden] = useState(false);
  const [isQuadrant2Hidden, setIsQuadrant2Hidden] = useState(false);
  const [isQuadrant3Hidden, setIsQuadrant3Hidden] = useState(false);
  const [isQuadrant4Hidden, setIsQuadrant4Hidden] = useState(false);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

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
    setFocusedQuadrant("All quadrants");
    setQuadrants([true, true, true, true]);
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
      className={`grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100svh-184px)] ${
        open ? "md:px-4" : "md:px-0"
      } transition-all duration-200`}
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
        hidden={
          focusedQuadrant === "All quadrants"
            ? isQuadrant1Hidden
            : focusedQuadrant !== "All quadrants" &&
              focusedQuadrant !== quadrantTitles[1]
        }
        onHideChange={setIsQuadrant1Hidden}
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
        hidden={
          focusedQuadrant === "All quadrants"
            ? isQuadrant2Hidden
            : focusedQuadrant !== "All quadrants" &&
              focusedQuadrant !== quadrantTitles[2]
        }
        onHideChange={setIsQuadrant2Hidden}
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
        hidden={
          focusedQuadrant === "All quadrants"
            ? isQuadrant3Hidden
            : focusedQuadrant !== "All quadrants" &&
              focusedQuadrant !== quadrantTitles[3]
        }
        onHideChange={setIsQuadrant3Hidden}
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
        hidden={
          focusedQuadrant === "All quadrants"
            ? isQuadrant4Hidden
            : focusedQuadrant !== "All quadrants" &&
              focusedQuadrant !== quadrantTitles[4]
        }
        onHideChange={setIsQuadrant4Hidden}
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
            onClick={() => setQuadrants([true, true, true, true])}
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
            {(activeProject || focusedQuadrant !== "All quadrants") && (
              <Button
                variant="link"
                size="sm"
                className="mr-2"
                onClick={handleFilterReset}
              >
                Clear filters
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Tag className="h-4 w-4" />
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
                      {project.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Grid2X2 className="h-4 w-4" />
                  {focusedQuadrant === "All quadrants"
                    ? "All quadrants"
                    : focusedQuadrantLabel(focusedQuadrant)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-66">
                <DropdownMenuRadioGroup
                  value={focusedQuadrant}
                  onValueChange={(value) => {
                    setFocusedQuadrant(value);
                    setQuadrants(
                      value === "All quadrants"
                        ? [true, true, true, true]
                        : [
                            value === quadrantTitles[1],
                            value === quadrantTitles[2],
                            value === quadrantTitles[3],
                            value === quadrantTitles[4],
                          ]
                    );
                  }}
                >
                  <DropdownMenuRadioItem value="All quadrants">
                    <QuadrantSelectOption
                      label={{ value: "All quadrants", theme: "gray" }}
                      type="backlog"
                    />
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={quadrantTitles[1]}>
                    <QuadrantSelectOption
                      label={{ value: quadrantTitles[1], theme: "red" }}
                      type="quadrant"
                    />
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={quadrantTitles[3]}>
                    <QuadrantSelectOption
                      label={{ value: quadrantTitles[3], theme: "sky" }}
                      type="quadrant"
                    />
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={quadrantTitles[2]}>
                    <QuadrantSelectOption
                      label={{ value: quadrantTitles[2], theme: "amber" }}
                      type="quadrant"
                    />
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={quadrantTitles[4]}>
                    <QuadrantSelectOption
                      label={{ value: quadrantTitles[4], theme: "purple" }}
                      type="quadrant"
                    />
                  </DropdownMenuRadioItem>
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
                  {listView(quadrants, sortBy)}
                </TabsContent>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Tabs>
  );
}
