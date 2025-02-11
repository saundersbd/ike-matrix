"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { Task } from "@/app/types/Task";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { Cog, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskHeaderProps {
  pageTitle: {
    title: string;
    icon?: LucideIcon;
  };
}

export function TaskHeader({ pageTitle }: TaskHeaderProps) {
  const { sortBy, setSortBy } = useWorkspace();

  return (
    <header className="sticky top-0 left-0 right-0 flex h-14 pl-8 pr-4 shrink-0 items-center justify-between z-20">
      <div>
        <h1 className="flex items-center gap-2 text-sm font-semibold">
          {pageTitle.icon && <pageTitle.icon className="w-4 h-4" />}
          {pageTitle.title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Cog className="size-4" />
        </Button>
      </div>
    </header>
  );
}
