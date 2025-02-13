"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterChipRound } from "@/components/controls/filtering/filter-chip-round";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";
import { Task } from "@/app/types/Task";

interface HomeProps {
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (open: boolean) => void;
}

export default function Home({
  isRightSidebarOpen,
  setIsRightSidebarOpen,
}: HomeProps) {
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
  );
}
