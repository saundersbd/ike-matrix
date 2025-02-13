"use client";

import { useTasks } from "@/hooks/use-tasks";
import { QUADRANTS, Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { QuadrantNew } from "@/components/quadrant-new";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ListFilter, Plus } from "lucide-react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";
import { NewTaskItem } from "@/components/lists/new-task-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterChipRound } from "@/components/controls/filtering/filter-chip-round";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";
import { Task } from "@/app/types/Task";

export default function Home() {
  const { tasks, sortBy, setSortBy } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    completedOnly: false,
    showCompleted: false,
    showArchived: false,
    projectId: null,
    quadrantId: null,
  });

  const getSortedTasksByQuadrant = (quadrant: QuadrantType) => {
    return sortedAndFilteredTasks.filter((task) => task.quadrant === quadrant);
  };

  return (
    <div className="flex flex-col flex-1 h-[calc(100svh)]">
      <header className="flex h-9 shrink-0 items-center justify-between p-6 border-b border-default-border/60">
        <h1 className="text-base font-medium">Eisenhower matrix</h1>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" className="rounded-full">
            <EllipsisVertical className="!size-4" />
          </Button>
        </div>
      </header>
      <ScrollArea className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 p-5">
          <div className="@3xl/main:h-[calc(100svh-6.5rem)] flex flex-col @3xl/main:grid @3xl/main:grid-cols-2 @3xl/main:grid-rows-2 gap-4.5">
            <QuadrantNew
              quadrant={QUADRANTS[1]}
              tasks={getSortedTasksByQuadrant(QUADRANTS[1])}
            />

            <QuadrantNew
              quadrant={QUADRANTS[2]}
              tasks={getSortedTasksByQuadrant(QUADRANTS[2])}
            />

            <QuadrantNew
              quadrant={QUADRANTS[3]}
              tasks={getSortedTasksByQuadrant(QUADRANTS[3])}
            />

            <QuadrantNew
              quadrant={QUADRANTS[4]}
              tasks={getSortedTasksByQuadrant(QUADRANTS[4])}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
