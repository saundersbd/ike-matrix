"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Project } from "@/app/types/Project";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { SortOption } from "@/lib/sort-options";
import { Task } from "@/app/types/Task";
interface FilterChipProps<T> {
  label: string;
  options: T[];
  onApplyFilter: (selectedItem: T) => void;
  onResetFilter: () => void;
  behavior: "radio" | "checkbox" | "sort";
  itemNode?: (item: T) => React.ReactNode;
  getItemId: (item: T) => string;
  getDisplayValue: (item: T) => string;
  value?: T | null;
  defaultValue?: T;
}

export function FilterChip<T>({
  label,
  options,
  onApplyFilter,
  onResetFilter,
  behavior = "radio",
  itemNode,
  getItemId,
  getDisplayValue,
  value,
  defaultValue,
}: FilterChipProps<T>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initialLabel = <span>All {label}</span>;
  const isDefaultValue =
    defaultValue && value && getItemId(defaultValue) === getItemId(value);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative inline-flex transition-all duration-200">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-7 gap-1 px-4 pr-3",
              "ring-zinc-200 rounded-md",
              value && behavior === "sort" && "!pr-2 !pl-2",
              value && !isDefaultValue && "pr-2.5 pl-3 ring-2 ring-zinc-800"
            )}
          >
            {behavior === "sort" && (
              <>
                <SortOptionListItem option={value as SortOption<Task>} dense />
                <ChevronDown className="!size-4" />
              </>
            )}
            {(behavior === "radio" || behavior === "checkbox") && (
              <>
                {value ? itemNode?.(value) : initialLabel}
                <ChevronDown className="!size-4" />
              </>
            )}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl">
        {value && behavior === "radio" && (
          <>
            <DropdownMenuItem
              className="px-3 py-2 rounded-lg"
              onClick={() => {
                onResetFilter();
                setIsMenuOpen(false);
              }}
            >
              View all {label}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {(behavior === "radio" || behavior === "sort") && (
          <DropdownMenuRadioGroup
            value={value ? getItemId(value) : undefined}
            onValueChange={(newValue) => {
              const selectedItem = options.find(
                (option) => getItemId(option) === newValue
              );
              if (selectedItem) {
                onApplyFilter(selectedItem);
              } else {
                onResetFilter();
              }
              setIsMenuOpen(false);
            }}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem
                key={getItemId(option)}
                value={getItemId(option)}
                className="rounded-lg px-3 py-2"
              >
                {itemNode ? itemNode(option) : getDisplayValue(option)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        )}
        {behavior === "checkbox" &&
          options.map((option) => (
            <DropdownMenuCheckboxItem
              key={getItemId(option)}
              checked={value ? getItemId(value) === getItemId(option) : false}
              onCheckedChange={(checked) => {
                if (checked) {
                  onApplyFilter(option);
                }
              }}
            >
              {itemNode ? itemNode(option) : getDisplayValue(option)}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
