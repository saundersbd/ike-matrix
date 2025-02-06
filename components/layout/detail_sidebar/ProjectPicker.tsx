import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";

import { Project } from "@/app/types/Project";
import { Task } from "@/app/types/Task";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, Plus, Tag } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";

interface ProjectPickerProps {
  selectedProject: Project | undefined;
  onProjectSelect: (project: Project) => void;
  task: Task;
}

export function ProjectPicker({
  selectedProject,
  onProjectSelect,
  task,
}: ProjectPickerProps) {
  const { projects, updateTask } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [commandValue, setCommandValue] = useState("");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex-1" asChild>
        <SidebarMenuButton className="group font-medium cursor-pointer transition-all duration-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/40 text-xs">
          {selectedProject ? (
            <>
              {selectedProject.icon && (
                <selectedProject.icon
                  className={`w-3.5 h-3.5 mr-2 ${
                    CUSTOM_THEME_COLORS[selectedProject.theme ?? "default"]
                      .iconColor
                  }`}
                />
              )}
              <span className="text-zinc-800 text-ellipsis overflow-hidden whitespace-nowrap">
                {selectedProject.name}
              </span>
            </>
          ) : (
            <>
              <Tag className="!w-3.5 !h-3.5 mr-2" />
              <span>Assign to project</span>
              <ChevronDown className="opacity-0 group-hover:opacity-100 w-4 h-4 ml-auto text-zinc-600 transition-opacity duration-200" />
            </>
          )}
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-xl overflow-hidden">
        <Command
          shouldFilter={true}
          loop={true}
          value={commandValue}
          onValueChange={setCommandValue}
        >
          <CommandInput
            placeholder="Search projects..."
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
            }}
          />
          <CommandEmpty>
            <CommandItem
              onSelect={() => {
                // TODO: Implement project creation logic
                console.log(`Creating new project: ${searchValue}`);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create &ldquo;{searchValue}&rdquo;
            </CommandItem>
          </CommandEmpty>
          <CommandList className="gap-1">
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => {
                    onProjectSelect(project);
                    updateTask(task.id, {
                      ...task,
                      projectId: project.id,
                    });
                    setIsOpen(false);
                  }}
                >
                  {project.icon && <project.icon className="w-4 h-4 mr-2" />}
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            {searchValue &&
              !projects.some(
                (p) => p.name.toLowerCase() === searchValue.toLowerCase()
              ) && (
                <CommandGroup heading="Create New" className="pt-0">
                  <CommandItem
                    onSelect={() => {
                      // TODO: Implement project creation logic
                      console.log(`Creating new project: ${searchValue}`);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create &ldquo;{searchValue}&rdquo;
                  </CommandItem>
                </CommandGroup>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
