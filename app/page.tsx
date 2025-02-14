"use client";

import { useSidebarContext } from "@/components/workspace-content";
import { useTasks } from "@/hooks/use-tasks";
import { QUADRANTS, Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { QuadrantNew } from "@/components/quadrant-new";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ListFilter, Plus } from "lucide-react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { RightPanel } from "@/components/layout/right_panel/right-panel";
import { useState } from "react";
import { NewTaskItem } from "@/components/lists/new-task-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";

import { FilterChipRound } from "@/components/controls/filtering/filter-chip-round";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";
import { Task } from "@/app/types/Task";

export default function Home({}) {
  const { isRightSidebarOpen, setIsRightSidebarOpen } = useSidebarContext();
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
    <div className="flex flex-col flex-1 h-[calc(100svh-4rem)]">
      <header className="flex h-11 shrink-0 items-center justify-between pl-6 pr-3 border-b border-default-border/60 bg-background">
        <h1 className="text-sm font-medium">Einsehower matrix</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="size-7">
            <Ellipsis className="!size-4" />
          </Button>

          <Separator
            className="h-4 mx-1.5 bg-default-border/60"
            orientation="vertical"
          />

          <SidebarTrigger
            side="right"
            onClick={() => {
              // Toggle the state value
              setIsRightSidebarOpen(!isRightSidebarOpen);
            }}
          />
        </div>
      </header>

      <div className="relative flex flex-1">
        <SidebarInset className="@container/main min-h-8 !h-[calc(100svh-4rem)] flex flex-col flex-1">
          <ScrollArea type="scroll" className="flex flex-col flex-1">
            <header className="flex h-11 shrink-0 items-center justify-between px-5 border-b border-default-border/60"></header>
            <div className="flex flex-col flex-1 p-5">
              <div className="flex gap-2">
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </SidebarInset>
        <RightPanel side="right" />
      </div>
    </div>
  );
}
