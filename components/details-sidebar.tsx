import { useState, useEffect } from "react";
import { format, isToday, formatDistance, addDays } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/app/types/Project";
import {
  ChevronDown,
  Clock,
  Ellipsis,
  Pencil,
  Plus,
  Trash,
  Calendar as CalendarIcon,
  Tag,
} from "lucide-react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Task } from "@/app/types/Task";
import { CUSTOM_THEME_COLORS } from "@/app/types/CustomTheme";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function DetailsSidebar({ task }: { task: Task }) {
  const { projects, updateProject, updateTask } = useWorkspace();

  const [projectPopoverOpen, setProjectPopoverOpen] = useState(true);
  const [editProjectNamePopoverOpen, setEditProjectNamePopoverOpen] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    projects.find((p) => p.id === task.projectId)
  );
  const [commandValue, setCommandValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editingName, setEditingName] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate || undefined
  );
  const [dueTime, setDueTime] = useState<Date | undefined>(
    task.dueTime ? new Date(new Date().setHours(12, 0, 0, 0)) : undefined
  );

  useEffect(() => {
    if (editProjectNamePopoverOpen && selectedProject) {
      setEditingName(selectedProject.name);
    }
  }, [editProjectNamePopoverOpen, selectedProject]);

  return (
    <>
      <Sidebar
        side="right"
        collapsible="none"
        className="w-[264px] h-[720px] hidden md:flex bg-zinc-50"
      >
        <SidebarContent className="gap-0">
          <SidebarGroup className="p-3 pt-5 gap-2.5">
            <SidebarGroupLabel className="p-0 px-2 h-auto font-semibold">
              Project
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex items-center gap-1.5">
                <Popover
                  open={projectPopoverOpen}
                  onOpenChange={setProjectPopoverOpen}
                >
                  <PopoverTrigger className="flex-1" asChild>
                    <SidebarMenuButton className="group font-medium cursor-pointer transition-all duration-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/40 text-xs">
                      {selectedProject ? (
                        <>
                          {selectedProject.icon && (
                            <selectedProject.icon
                              className={`w-3.5 h-3.5 mr-2 ${
                                CUSTOM_THEME_COLORS[
                                  selectedProject.theme ?? "default"
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
                                setSelectedProject(project);
                                updateTask(task.id, {
                                  ...task,
                                  projectId: project.id,
                                });
                                setProjectPopoverOpen(false);
                              }}
                            >
                              {project.icon && (
                                <project.icon className="w-4 h-4 mr-2" />
                              )}
                              {project.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        {searchValue &&
                          !projects.some(
                            (p) =>
                              p.name.toLowerCase() === searchValue.toLowerCase()
                          ) && (
                            <CommandGroup heading="Create New" className="pt-0">
                              <CommandItem
                                onSelect={() => {
                                  // TODO: Implement project creation logic
                                  console.log(
                                    `Creating new project: ${searchValue}`
                                  );
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
                {selectedProject && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div
                        role="button"
                        className="shrink-0 cursor-pointer w-7 h-7 rounded-md transition-colors duration-200 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
                        onClick={() => {
                          setEditProjectNamePopoverOpen(true);
                        }}
                      >
                        <Ellipsis className="w-3.5 h-3.5" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditProjectNamePopoverOpen(true);
                        }}
                      >
                        <Pencil className="w-3.5 h-3.5 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          updateTask(task.id, {
                            ...task,
                            projectId: undefined,
                          });
                          setSelectedProject(undefined);
                        }}
                      >
                        <Trash className="w-3.5 h-3.5 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="bg-zinc-200/70" />
          <SidebarGroup className="p-3 pt-5 gap-2.5">
            <SidebarGroupLabel className="p-0 px-2 h-auto font-semibold">
              Due date
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex items-center gap-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      className={`group font-medium cursor-pointer transition-all duration-200 hover:text-zinc-800 hover:bg-zinc-200/40 text-xs ${
                        dueDate ? "text-zinc-800" : "text-zinc-500"
                      }`}
                    >
                      <CalendarIcon className="!w-3.5 !h-3.5 mr-2" />
                      <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {dueDate ? (
                          isToday(dueDate) ? (
                            "Today"
                          ) : dueDate < new Date() ? (
                            <span className="text-red-500">
                              {`Due ${formatDistance(dueDate, new Date(), {
                                addSuffix: true,
                              }).replace(/^about /, "")}`}
                            </span>
                          ) : (
                            format(
                              dueDate,
                              dueDate.getFullYear() === new Date().getFullYear()
                                ? "MMM d"
                                : "MMM d, yyyy"
                            )
                          )
                        ) : (
                          "Add due date"
                        )}
                      </span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={(date) => {
                        setDueDate(date);
                        if (date) {
                          updateTask(task.id, {
                            ...task,
                            dueDate: date,
                          });
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {dueDate && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div
                        role="button"
                        className="shrink-0 cursor-pointer w-7 h-7 rounded-md transition-colors duration-200 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
                        onClick={() => {
                          setEditProjectNamePopoverOpen(true);
                        }}
                      >
                        <Ellipsis className="w-3.5 h-3.5" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          const newDate = addDays(dueDate, 7);
                          setDueDate(newDate);
                          updateTask(task.id, {
                            ...task,
                            dueDate: newDate,
                          });
                        }}
                      >
                        <Plus className="w-3.5 h-3.5 mr-2" />
                        Extend a week
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setDueDate(undefined);
                          updateTask(task.id, {
                            ...task,
                            dueDate: undefined,
                          });
                        }}
                      >
                        <Trash className="w-3.5 h-3.5 mr-2" />
                        Clear due date
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              {task.dueDate && (
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      className={`group font-medium cursor-pointer transition-all duration-200 hover:text-zinc-800 hover:bg-zinc-200/40 text-xs ${
                        dueTime ? "text-zinc-800" : "text-zinc-500"
                      }`}
                    >
                      <Clock className="!w-3.5 !h-3.5 mr-2" />
                      <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {dueTime ? format(dueTime, "h:mm a") : "Add time"}
                      </span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    Select time
                  </PopoverContent>
                </Popover>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="bg-zinc-200/70" />
        </SidebarContent>
      </Sidebar>
      <Dialog
        open={editProjectNamePopoverOpen}
        onOpenChange={setEditProjectNamePopoverOpen}
      >
        <DialogContent className="p-0 max-w-[348px]">
          <DialogHeader className="p-5 pb-0">
            <DialogTitle className="text-lg font-medium">
              Edit project name
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 p-5">
            <Input
              className="text-lg font-medium"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
            />
          </div>
          <DialogFooter className="p-5 pt-0">
            <Button
              variant="outline"
              onClick={() => {
                setEditProjectNamePopoverOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedProject) {
                  const updatedProject = {
                    ...selectedProject,
                    name: editingName,
                  };
                  updateProject(selectedProject.id, updatedProject);
                  setSelectedProject(updatedProject);
                }
                setEditProjectNamePopoverOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
