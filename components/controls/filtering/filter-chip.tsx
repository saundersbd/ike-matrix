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
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { ProjectListItem } from "@/components/controls/filtering/project-list-item";

interface FilterChipProps {
  label: string;
  options: Project[];
  onApplyFilter: (selectedItem: Project) => void;
  onResetFilter: () => void;
}

export function FilterChip({
  label,
  options,
  onApplyFilter,
  onResetFilter,
}: FilterChipProps) {
  const [active, setActive] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative inline-flex">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 gap-1 px-4",
              "ring-zinc-300 rounded-full",
              active && "!pr-2.5 !pl-3 ring-2 ring-zinc-800"
            )}
          >
            {active ? <ProjectListItem project={active} dense /> : label}
            <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-66 rounded-xl">
        {active && (
          <>
            <DropdownMenuItem
              className="px-3 py-2 rounded-lg"
              onClick={() => {
                onResetFilter();
                setActive(null);
                setIsMenuOpen(false);
              }}
            >
              View all projects
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuRadioGroup
          value={active?.id}
          onValueChange={(value) => {
            const selectedProject =
              options.find((option) => option.id === value) ?? null;
            setActive(selectedProject);
            if (selectedProject) {
              onApplyFilter(selectedProject);
            }
            setIsMenuOpen(false);
          }}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.id}
              value={option.id}
              className="rounded-lg px-3 py-2"
            >
              <ProjectListItem project={option} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
