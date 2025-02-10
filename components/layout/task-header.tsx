import { SidebarTrigger } from "@/components/ui/sidebar";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";
import { ViewSwitcher } from "@/components/controls/view-switcher";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/app/types/Task";

interface TaskHeaderProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  handleViewChange?: (view: string) => void;
}

export function TaskHeader({
  sortBy,
  setSortBy,
  handleViewChange,
}: TaskHeaderProps) {
  return (
    <header className="flex h-14 px-5 shrink-0 items-center justify-between bg-white/90 border-b border-zinc-200/50">
      <SidebarTrigger />
      <div className="flex items-center gap-3">
        <FilterChip<SortOption<Task>>
          label="created date"
          options={TASK_SORT_OPTIONS}
          onApplyFilter={(option) => setSortBy(option.id)}
          onResetFilter={() => setSortBy("created")}
          itemNode={(option) => <SortOptionListItem option={option} />}
          behavior="sort"
          getItemId={(option) => option.id}
          getDisplayValue={(option) => option.label}
          value={TASK_SORT_OPTIONS.find((option) => option.id === sortBy)}
          defaultValue={TASK_SORT_OPTIONS.find(
            (option) => option.id === "created"
          )}
        />
        {handleViewChange && (
          <>
            <Separator
              orientation="vertical"
              className="h-5 mx-2 bg-zinc-200"
            />
            <ViewSwitcher
              setView={handleViewChange as (view: "grid" | "list") => void}
            />
          </>
        )}
      </div>
    </header>
  );
}
