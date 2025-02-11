"use client";

import { useTasks } from "@/hooks/use-tasks";
import { QUADRANTS, Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { QuadrantNew } from "@/components/quadrant-new";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus } from "lucide-react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";
import { NewTaskItem } from "@/components/lists/new-task-item";

export default function Home() {
  const { tasks, sortBy } = useWorkspace();
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

  const [visibilityControls] = useState([false, false, false, false]);
  const visibleQuadrantCount = visibilityControls.filter((v) => !v).length;

  return (
    <div className="flex flex-1 flex-col gap-2.5 p-3">
      <header className="h-14 flex shrink-0 items-center justify-end px-2.75 bg-zinc-50/80 backdrop-blur-sm rounded-xl">
        <Button
          variant="secondary"
          size="icon-lg"
          className="bg-violet-200/50 hover:bg-violet-200/67 text-violet-700 hover:text-violet-800 rounded-full"
        >
          <ListFilter className="!size-4" />
        </Button>
      </header>
      <div className="flex flex-col flex-1">
        <div className="max-w-6xl mx-auto container h-[calc(100svh-5.625rem)] grid grid-cols-2 grid-rows-2 gap-2.5">
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
    </div>
  );
}
