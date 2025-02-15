"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { useSidebarContext } from "@/components/workspace-content";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { Ellipsis } from "lucide-react";
import { useNewTaskDialog } from "@/components/workspace-content";
import { TableTaskItem } from "@/components/lists/table-task-item";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { RightPanel } from "@/components/layout/right_panel/right-panel";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { FilterChipRound } from "@/components/controls/filtering/filter-chip-round";

import { Task } from "@/app/types/Task";

import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

export default function InboxPage() {
  const { isRightSidebarOpen, setIsRightSidebarOpen } = useSidebarContext();
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
      <header className="flex h-11 shrink-0 items-center justify-between pl-6 pr-3 border-b border-default-border/60 bg-background">
        <h1 className="text-sm font-medium">Inbox</h1>
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
        <SidebarInset className="min-h-8 !h-[calc(100svh-4rem)] flex flex-col flex-1 w-full overflow-x-auto">
          <header className="flex h-11 shrink-0 items-center justify-between px-5 border-b border-default-border/60"></header>
          <ScrollArea type="scroll" className="flex flex-col flex-1">
            <div className="min-w-[720px] flex flex-col flex-1 pb-6 pt-5">
              <div className="flex flex-col">
                {sortedAndFilteredTasks.map((task) => (
                  <TableTaskItem key={task.id} task={task} />
                ))}
              </div>

              <div className="max-w-2xl mx-auto absolute bottom-10 left-10 right-10 flex flex-col gap-4 bg-white rounded-xl p-4.5 ring-1 ring-zinc-900/[.05] shadow overflow-visible">
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </SidebarInset>
        <RightPanel side="right" />
      </div>
    </div>
  );
}
