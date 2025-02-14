"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ListFilter, EllipsisVertical } from "lucide-react";
import { useNewTaskDialog } from "@/components/workspace-content";
import { TableTaskItem } from "@/components/lists/table-task-item";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { FilterChipRound } from "@/components/controls/filtering/filter-chip-round";

import { Task } from "@/app/types/Task";

import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

export default function InboxPage() {
  const { tasks, sortBy, setSortBy } = useWorkspace();
  const [taskText, setTaskText] = useState("");
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
    <div className="flex flex-col flex-1 h-[calc(100svh-4rem)]">
      <header className="flex h-11 shrink-0 items-center justify-between px-5 border-b border-default-border/60">
        {/* <h1 className="text-lg font-semibold">Inbox</h1>
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
        </div> */}
      </header>
      <ScrollArea className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 py-6">
          <div className="flex flex-col">
            {sortedAndFilteredTasks.map((task) => (
              <TableTaskItem key={task.id} task={task} />
            ))}
          </div>

          <div className="max-w-2xl mx-auto absolute bottom-12 left-12 right-12 flex flex-col gap-4 bg-white rounded-xl p-4.5 ring-1 ring-zinc-900/[.05] shadow overflow-visible">
            <TextareaAutosize
              className="grow bg-white p-0 resize-none outline-none text-lg"
              placeholder="Trim the hedges"
              id="task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <span>Hello</span>
              <Button size="xs" className="w-max">
                Add to inbox
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
