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
    <div className="flex flex-col bg-white/[.85] rounded-2xl h-[calc(100svh-2rem)]">
      <header className="flex h-12 shrink-0 items-center justify-between rounded-xl px-7 mt-4">
        <h1 className="text-3xl font-bold">Eisenhower matrix</h1>
        <div className="flex items-center gap-2">
          <FilterChipRound<SortOption<Task>>
            label="created date"
            options={TASK_SORT_OPTIONS}
            onApplyFilter={(option) => setSortBy(option.id)}
            onResetFilter={() => setSortBy("created")}
            itemNode={(option) => <SortOptionListItem option={option} />}
            behavior="sort"
            getItemId={(option) => option.id}
            getDisplayValue={(option) => option.label}
            value={TASK_SORT_OPTIONS.find((option) => option.id === sortBy)} // Remove hardcoded value
            defaultValue={TASK_SORT_OPTIONS.find(
              (option) => option.id === "dueDate"
            )}
          />
          <Button variant="secondary" size="icon-lg" className="rounded-full">
            <EllipsisVertical className="!size-4" />
          </Button>
        </div>
      </header>
      <ScrollArea className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 p-4">
          <div className="@4xl/main:h-[calc(100svh-8rem)] flex flex-col @4xl/main:grid @4xl/main:grid-cols-2 @4xl/main:grid-rows-2 gap-3.5">
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
