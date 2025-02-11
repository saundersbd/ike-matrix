"use client";

import { useTasks } from "@/hooks/use-tasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Button } from "@/components/ui/button";
import { ListFilter, EllipsisVertical } from "lucide-react";
import { useNewTaskDialog } from "@/components/workspace-content";
import { NewTaskItem } from "@/components/lists/new-task-item";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { FilterChipRound } from "@/components/controls/filtering/filter-chip-round";

import { Task } from "@/app/types/Task";

import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

export default function InboxPage() {
  const { tasks, sortBy, setSortBy } = useWorkspace();

  const { openNewTaskDialog } = useNewTaskDialog();
  const sortedAndFilteredTasks = useTasks(tasks, sortBy, {
    showCompleted: false,
    showArchived: false,
    projectId: null,
    quadrantId: 0,
  });

  const handleNewTask = () => {
    openNewTaskDialog(undefined);
  };

  return (
    <div className="flex flex-col  bg-white/[.85] rounded-2xl h-[calc(100svh-2rem)] min-w-lg max-w-xl">
      <header className="flex h-12 shrink-0 items-center justify-between rounded-xl px-7 mt-4">
        <h1 className="text-3xl font-bold">Inbox</h1>
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
          <Button
            variant="secondary"
            size="icon-lg"
            className="bg-violet-200/50 hover:bg-violet-200/67 text-violet-800 hover:text-violet-900 rounded-full"
          >
            <EllipsisVertical className="!size-4" />
          </Button>
        </div>

        <div className="hidden items-center gap-3">
          <FilterChip<SortOption<Task>>
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
        </div>
      </header>
      <ScrollArea className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 p-7">
          <div className="flex flex-col">
            {sortedAndFilteredTasks.map((task) => (
              <NewTaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
