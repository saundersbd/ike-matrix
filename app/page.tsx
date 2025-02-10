"use client";

import { useTasks } from "@/hooks/use-tasks";
import { QUADRANTS, Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { Quadrant } from "@/components/quadrant";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";

export default function Home() {
  const { tasks, sortBy } = useWorkspace();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    showCompleted: false,
    showArchived: false,
    projectId: null,
  });

  const getSortedTasksByQuadrant = (quadrant: QuadrantType) => {
    return sortedAndFilteredTasks.filter((task) => task.quadrant === quadrant);
  };

  const [visibilityControls] = useState([false, false, false, false]);
  const visibleQuadrantCount = visibilityControls.filter((v) => !v).length;

  const handleOpenNewTaskDialog = () => {
    // Implement dialog opening logic
  };

  return (
    <div className="flex flex-1 flex-col p-6 pb-8">
      <div className="max-w-6xl mx-auto container h-[calc(100svh-8rem)] grid grid-cols-2 grid-rows-2 gap-6">
        <Quadrant
          quadrant={QUADRANTS[1]}
          tasks={getSortedTasksByQuadrant(QUADRANTS[1])}
          hidden={visibilityControls[0]}
          className={cn(
            visibleQuadrantCount === 3 && "row-span-2",
            visibleQuadrantCount === 2 && "row-span-1"
          )}
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
        />
        <Quadrant
          quadrant={QUADRANTS[2]}
          tasks={getSortedTasksByQuadrant(QUADRANTS[2])}
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
          tasks={getSortedTasksByQuadrant(QUADRANTS[3])}
          hidden={visibilityControls[2]}
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
        />
        <Quadrant
          quadrant={QUADRANTS[4]}
          tasks={getSortedTasksByQuadrant(QUADRANTS[4])}
          hidden={visibilityControls[3]}
          handleOpenNewTaskDialog={handleOpenNewTaskDialog}
        />
      </div>
    </div>
  );
}
