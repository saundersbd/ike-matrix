"use client";

import { QUADRANTS } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { TabsContent } from "@/components/ui/tabs";
import { Quadrant } from "@/components/quadrant";
import { Task } from "@/app/types/Task";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";

export default function Grid() {
  // Get tasks from workspace context directly
  const { tasks } = useWorkspace();
  const [visibilityControls] = useState([false, false, false, false]);
  const visibleQuadrantCount = visibilityControls.filter((v) => !v).length;

  const handleOpenNewTaskDialog = (quadrantId: number) => {
    // Implement dialog opening logic
  };

  // Filter and sort tasks as needed
  const sortedAndFilteredTasks = tasks;

  return (
    <div className="flex flex-1 flex-col p-6 pb-8">
      <div className="max-w-6xl mx-auto container h-[calc(100svh-8rem)] grid grid-cols-2 grid-rows-2 gap-6">
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
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
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
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
        />
        <Quadrant
          quadrant={QUADRANTS[3]}
          tasks={sortedAndFilteredTasks.filter(
            (task) =>
              task.quadrant.id === 3 &&
              (!task.completed || task.isCompletionTransitioning)
          )}
          hidden={visibilityControls[2]}
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
        />
        <Quadrant
          quadrant={QUADRANTS[4]}
          tasks={sortedAndFilteredTasks.filter(
            (task) =>
              task.quadrant.id === 4 &&
              (!task.completed || task.isCompletionTransitioning)
          )}
          hidden={visibilityControls[3]}
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
        />
      </div>
    </div>
  );
}
