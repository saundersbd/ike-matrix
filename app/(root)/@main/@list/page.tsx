"use client";

import { QUADRANTS } from "@/app/types/Quadrant";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Quadrant } from "@/components/quadrant";
import { Task } from "@/app/types/Task";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";
import { Plus, Circle } from "lucide-react";
import { TaskList } from "@/components/lists/task-list";
import { TaskListTableRow } from "@/components/lists/task-list-table-row";

export default function List() {
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
    <div className="container mx-auto max-w-4xl py-8 px-6 flex flex-col">
      {[1, 2, 3, 4].map((quadrantNumber) => {
        if (visibilityControls[quadrantNumber - 1]) return null;

        const quadrantTasks = tasks.filter(
          (task) =>
            task.quadrant.id === quadrantNumber &&
            (!task.completed || task.isCompletionTransitioning)
        );

        return quadrantTasks.length > 0 ? (
          <div key={quadrantNumber} className="mb-7 last:mb-0">
            <div className="flex items-center justify-between mb-3.5 mx-5">
              <div className="flex items-center gap-2.5">
                <Circle
                  className={`w-[8px] h-[8px] ${QUADRANTS[quadrantNumber].theme.accentColor}`}
                />
                <h3 className="text-sm font-semibold text-zinc-500">
                  {QUADRANTS[quadrantNumber].title}
                </h3>
              </div>
            </div>

            <div className="ring-1 ring-black/[.05] rounded-2xl bg-white shadow-xs">
              <TaskList gap={false} className="px-5 py-3">
                {quadrantTasks.map((task) => (
                  <TaskListTableRow key={task.id} task={task} />
                ))}
              </TaskList>
            </div>
          </div>
        ) : (
          <div key={quadrantNumber} className="mb-6 last:mb-0">
            <div className="flex items-center justify-between mb-2.5 mx-4">
              <div className="flex items-center gap-2.5">
                <Circle
                  className={`w-[8px] h-[8px] ${QUADRANTS[quadrantNumber].theme.accentColor}`}
                />
                <h3 className="text-sm font-medium text-gray-500">
                  {QUADRANTS[quadrantNumber].title}
                </h3>
              </div>
              <Button variant="ghost" size="sm" className="rounded-lg">
                <Plus className="h-4 w-4" />
                New task
              </Button>
            </div>
            <div className="flex items-center justify-center p-7 ring-1 ring-black/[.08] rounded-xl bg-white/50">
              <span className="text-sm text-gray-500 text-center">
                No tasks
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
