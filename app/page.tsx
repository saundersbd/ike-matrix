"use client";

import { useTasks } from "@/app/contexts/TaskContext";
import { useHotkeys } from "react-hotkeys-hook";
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
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { Quadrant } from "@/components/quadrant";
import { TaskListTableRow } from "@/components/task-list-table-row";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { ArrowUpDown, Circle, Filter, Grid2X2, List } from "lucide-react";
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";
import { useState } from "react";
import { Task } from "@/app/types/Task";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("created");
  const [quadrants, setQuadrants] = useState([true, true, true, true]);
  const [open, setOpen] = useState(true);
  const [focusedQuadrant, setFocusedQuadrant] = useState("All tasks");
  const { tasks } = useTasks();
  const [isQuadrant1Hidden, setIsQuadrant1Hidden] = useState(false);
  const [isQuadrant2Hidden, setIsQuadrant2Hidden] = useState(false);
  const [isQuadrant3Hidden, setIsQuadrant3Hidden] = useState(false);
  const [isQuadrant4Hidden, setIsQuadrant4Hidden] = useState(false);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

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

  const sortTasks = (tasks: Task[], sortBy: string) => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "updated":
          if (!a.updatedAt) return 1;
          if (!b.updatedAt) return -1;
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default:
          return 0;
      }
    });
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
    <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100svh-184px)]">
      <Quadrant
        quadrant={1}
        title="Important AND urgent"
        theme="red"
        tasks={sortTasks(
          tasks.filter(
            (task) =>
              task.quadrant === 1 &&
              (!task.completed || task.isCompletionTransitioning)
          ),
          sortBy
        )}
        hidden={
          focusedQuadrant === "All tasks"
            ? isQuadrant1Hidden
            : focusedQuadrant !== "All tasks" &&
              focusedQuadrant !== quadrantTitles[1]
        }
        onHideChange={setIsQuadrant1Hidden}
      />
      <Quadrant
        quadrant={2}
        title="Important but not urgent"
        theme="amber"
        tasks={sortTasks(
          tasks.filter(
            (task) =>
              task.quadrant === 2 &&
              (!task.completed || task.isCompletionTransitioning)
          ),
          sortBy
        )}
        hidden={
          focusedQuadrant === "All tasks"
            ? isQuadrant2Hidden
            : focusedQuadrant !== "All tasks" &&
              focusedQuadrant !== quadrantTitles[2]
        }
        onHideChange={setIsQuadrant2Hidden}
      />
      <Quadrant
        quadrant={3}
        title="Urgent but not important"
        theme="sky"
        tasks={sortTasks(
          tasks.filter(
            (task) =>
              task.quadrant === 3 &&
              (!task.completed || task.isCompletionTransitioning)
          ),
          sortBy
        )}
        hidden={
          focusedQuadrant === "All tasks"
            ? isQuadrant3Hidden
            : focusedQuadrant !== "All tasks" &&
              focusedQuadrant !== quadrantTitles[3]
        }
        onHideChange={setIsQuadrant3Hidden}
      />
      <Quadrant
        quadrant={4}
        title="Neither urgent nor important"
        theme="purple"
        tasks={sortTasks(
          tasks.filter(
            (task) =>
              task.quadrant === 4 &&
              (!task.completed || task.isCompletionTransitioning)
          ),
          sortBy
        )}
        hidden={
          focusedQuadrant === "All tasks"
            ? isQuadrant4Hidden
            : focusedQuadrant !== "All tasks" &&
              focusedQuadrant !== quadrantTitles[4]
        }
        onHideChange={setIsQuadrant4Hidden}
      />
    </div>
  );

  const listView = (quadrants: boolean[], sortBy: string) => (
    <div className="max-w-5xl mx-auto px-5 py-2 flex flex-col h-[calc(100svh-(var(--header-height)+82px))]">
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

          const quadrantTasks = sortTasks(
            tasks.filter(
              (task) =>
                task.quadrant === quadrantNumber &&
                (!task.completed || task.isCompletionTransitioning)
            ),
            sortBy
          );

          return quadrantTasks.length > 0 ? (
            <div key={quadrantNumber} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2.5 mb-4 ml-3">
                <Circle
                  className={`w-[8px] h-[8px] ${
                    THEME_COLORS[quadrantThemes[quadrantNumber]].accentColor
                  }`}
                />
                <h3 className="text-sm font-semibold text-gray-500">
                  {quadrantTitles[quadrantNumber]}
                </h3>
              </div>

              <div className="px-5 py-4 ring-1 ring-black/[.08] rounded-2xl bg-white shadow-sm">
                {quadrantTasks.map((task) => (
                  <TaskListTableRow key={task.id} task={task} />
                ))}
              </div>
            </div>
          ) : (
            <div key={quadrantNumber} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2.5 mb-4 ml-3">
                <Circle
                  className={`w-[8px] h-[8px] ${
                    THEME_COLORS[quadrantThemes[quadrantNumber]].accentColor
                  }`}
                />
                <h3 className="text-sm font-medium text-gray-500">
                  {quadrantTitles[quadrantNumber]}
                </h3>
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

    // Use the corresponding theme color, or default to gray for "All tasks"
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
      defaultValue="grid"
      onValueChange={(value) => setView(value as "grid" | "list")}
    >
      <SidebarProvider
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col"
      >
        <header className="sticky top-0 mb-0 flex shrink-0 items-center justify-between gap-4 h-[calc(var(--header-height))] bg-white px-8 border-b border-zinc-200/70">
          <SidebarTrigger />

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Filter className="h-4 w-4" />
                  {focusedQuadrant === "All tasks"
                    ? "All tasks"
                    : focusedQuadrantLabel(focusedQuadrant)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-66">
                <DropdownMenuRadioGroup
                  value={focusedQuadrant}
                  onValueChange={(value) => {
                    setFocusedQuadrant(value);
                    setQuadrants(
                      value === "All tasks"
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
                  <DropdownMenuRadioItem value="All tasks">
                    <QuadrantSelectOption
                      label={{ value: "All tasks", theme: "gray" }}
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
            tasks={sortTasks(
              tasks.filter(
                (task) =>
                  task.quadrant === 0 &&
                  (!task.completed || task.isCompletionTransitioning)
              ),
              sortBy
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
