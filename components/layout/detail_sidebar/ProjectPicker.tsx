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
import { ChevronDown, Home, Plus, Tag } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CUSTOM_THEME_COLORS, ThemeName } from "@/app/types/CustomTheme";

interface ProjectPickerProps {
  selectedProject: Project | undefined;
  onProjectSelect: (project: Project) => void;
  task: Task;
  createProject: (project: Project) => void;
}

export function ProjectPicker({
  selectedProject,
  onProjectSelect,
  task,
  createProject,
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
                    CUSTOM_THEME_COLORS[
                      (selectedProject.theme ??
                        "default") as keyof typeof CUSTOM_THEME_COLORS
                    ].iconColor
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
              <Plus className="!w-5 !h-5 mr-1" />
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
                  className="px-2.5 py-2 rounded-lg"
                >
                  {project.icon && (
                    <project.icon
                      className={`!w-5 !h-5 mr-1 ${
                        CUSTOM_THEME_COLORS[
                          (project.theme ??
                            "default") as keyof typeof CUSTOM_THEME_COLORS
                        ].iconColor
                      }`}
                    />
                  )}
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>

            {searchValue &&
              !projects.some(
                (p) => p.name.toLowerCase() === searchValue.toLowerCase()
              ) && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Create New" className="pt-0">
                    <CommandItem
                      onSelect={() => {
                        const newProject = {
                          id: crypto.randomUUID(),
                          name: searchValue,
                          value: searchValue,
                          icon: Home,
                          theme: "default" as ThemeName,
                        };
                        createProject(newProject);
                        onProjectSelect(newProject);
                        console.log("task", task);
                        updateTask(task.id, {
                          projectId: newProject.id,
                        });
                        console.log("newProject", newProject.id);
                        setIsOpen(false);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Create &ldquo;{searchValue}&rdquo;
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
