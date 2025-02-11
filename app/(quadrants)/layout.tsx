"use client";

import { usePathname } from "next/navigation";
import { Task } from "@/app/types/Task";
import { QUADRANTS } from "@/app/types/Quadrant";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { FilterChip } from "@/components/controls/filtering/filter-chip";

import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sortBy, setSortBy } = useWorkspace();

  const pathname = usePathname();
  const quadrantNumber = pathname.split("/").pop(); // Gets "1", "2", "3", or "4" as string
  const quadrant = QUADRANTS.find((q) => q.id === Number(quadrantNumber));
  const title = quadrant?.title ?? "Quadrant";
  const description = quadrant?.description;

  return (
    <div className="flex flex-1 flex-col px-10 py-8">
      <div className="max-w-4xl mx-auto container">
        <div className="flex mb-4 hidden">
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
        {children}
      </div>
    </div>
  );
}
