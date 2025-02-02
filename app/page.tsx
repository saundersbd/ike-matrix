"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Quadrant } from "@/components/quadrant";
import { TaskListItem } from "@/components/task-list-item";
import { TaskListTableRow } from "@/components/task-list-table-row";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { tasks } from "@/app/data/tasks";
import { ArrowUpDown, Filter } from "lucide-react";
import { THEME_COLORS, THEME_COLORS_LIST, ThemeName } from "@/app/types/Theme";
import { useState } from "react";
import { Task } from "@/app/types/Task";

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

const gridView = (sortBy: string) => (
  <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100svh-(var(--header-height)+116px))]">
    <Quadrant
      quadrant={0}
      title="Important AND urgent"
      theme="red"
      taskCount={tasks.filter((task) => task.quadrant === 1).length}
    >
      {sortTasks(
        tasks.filter((task) => task.quadrant === 1),
        sortBy
      ).map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </Quadrant>
    <Quadrant
      quadrant={1}
      title="Important but not urgent"
      theme="amber"
      taskCount={tasks.filter((task) => task.quadrant === 2).length}
    >
      {tasks
        .filter((task) => task.quadrant === 2)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
    <Quadrant
      quadrant={2}
      title="Urgent but not important"
      theme="sky"
      taskCount={tasks.filter((task) => task.quadrant === 3).length}
    >
      {tasks
        .filter((task) => task.quadrant === 3)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
    <Quadrant
      quadrant={3}
      title="Not urgent or important"
      theme="gray"
      taskCount={tasks.filter((task) => task.quadrant === 4).length}
    >
      {tasks
        .filter((task) => task.quadrant === 4)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
  </div>
);

const listView = (quadrants: boolean[], sortBy: string) => (
  <div className="flex flex-col h-[calc(100svh-(var(--header-height)+82px))]">
    {[1, 3, 2, 4].map((quadrantNumber) => {
      if (!quadrants[quadrantNumber - 1]) return null;
      const quadrantTasks = sortTasks(
        tasks.filter((task) => task.quadrant === quadrantNumber),
        sortBy
      );
      const quadrantTitles: Record<number, string> = {
        1: "Important and urgent",
        2: "Important but not urgent",
        3: "Urgent but not important",
        4: "Not urgent or important",
      };
      const quadrantThemes: Record<number, ThemeName> = {
        1: "red",
        2: "amber",
        3: "sky",
        4: "gray",
      };

      return quadrantTasks.length > 0 ? (
        <div key={quadrantNumber} className="mb-5 last:mb-0">
          <div className="flex items-center gap-2.5 mb-3 ml-3">
            <div
              className={`w-[7px] h-[7px] rounded-full ${
                THEME_COLORS[quadrantThemes[quadrantNumber]].accentColor
              }`}
            />
            <h3 className="text-sm font-medium text-gray-500">
              {quadrantTitles[quadrantNumber]}
            </h3>
          </div>

          <div className="px-5 py-3 ring-1 ring-black/[.08] rounded-2xl bg-white">
            {quadrantTasks.map((task) => (
              <TaskListTableRow key={task.id} task={task} />
            ))}
          </div>
        </div>
      ) : (
        <div key={quadrantNumber} className="mb-5 last:mb-0">
          <div className="flex items-center gap-2.5 mb-3 ml-3">
            <div
              className={`w-[7px] h-[7px] rounded-full ${
                THEME_COLORS[quadrantThemes[quadrantNumber]].accentColor
              }`}
            />
            <h3 className="text-sm font-medium text-gray-500">
              {quadrantTitles[quadrantNumber]}
            </h3>
          </div>
          <div className="flex items-center justify-center p-7 ring-1 ring-black/[.08] rounded-xl bg-white">
            <span className="text-sm text-gray-500 text-center">No tasks</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default function Home() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("created");
  const [quadrants, setQuadrants] = useState([true, true, true, true]);
  return (
    <Tabs
      defaultValue="grid"
      onValueChange={(value) => setView(value as "grid" | "list")}
    >
      <header className="mb-5 flex shrink-0 items-center justify-between h-12 gap-4">
        <TabsList className="bg-zinc-200/[.75]">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={view !== "list"}
              >
                <Filter className="h-4 w-4" />
                Show
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Show sections</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={quadrants[0]}
                onCheckedChange={() => {
                  setQuadrants([
                    !quadrants[0],
                    quadrants[1],
                    quadrants[2],
                    quadrants[3],
                  ]);
                }}
              >
                Important and urgent
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={quadrants[1]}
                onCheckedChange={() => {
                  setQuadrants([
                    quadrants[0],
                    !quadrants[1],
                    quadrants[2],
                    quadrants[3],
                  ]);
                }}
              >
                Important but not urgent
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={quadrants[2]}
                onCheckedChange={() => {
                  setQuadrants([
                    quadrants[0],
                    quadrants[1],
                    !quadrants[2],
                    quadrants[3],
                  ]);
                }}
              >
                Urgent but not important
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={quadrants[3]}
                onCheckedChange={() => {
                  setQuadrants([
                    quadrants[0],
                    quadrants[1],
                    quadrants[2],
                    !quadrants[3],
                  ]);
                }}
              >
                Not urgent or important
              </DropdownMenuCheckboxItem>
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
              <DropdownMenuLabel>
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
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
          <NewTaskDialog />
          <Separator
            orientation="vertical"
            className="h-[24px] mx-2 bg-zinc-300"
          />
          <SidebarTrigger />
        </div>
      </header>
      <main>
        <div className="h-[calc(100svh-(var(--header-height)+120px))]">
          <TabsContent value="grid">{gridView(sortBy)}</TabsContent>
          <TabsContent value="list">{listView(quadrants, sortBy)}</TabsContent>
        </div>
      </main>
    </Tabs>
  );
}
