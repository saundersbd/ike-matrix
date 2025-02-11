"use client";

import { useTasks } from "@/hooks/use-tasks";
import { QUADRANTS, Quadrant as QuadrantType } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { QuadrantNew } from "@/components/quadrant-new";
import { Checkbox } from "@/components/ui/checkbox";
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

  const handleOpenNewTaskDialog = () => {
    // Implement dialog opening logic
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="max-w-6xl mx-auto container h-svh grid grid-cols-2 grid-rows-2 gap-2.5 p-3">
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
