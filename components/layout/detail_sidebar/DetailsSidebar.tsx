import { useState, useEffect } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

import { ProjectProvider } from "@/app/contexts/ProjectContext";

import { format, isToday, formatDistance, addDays } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupAction,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  RotateCcw,
  PaintRoller,
  SwatchBook,
} from "lucide-react";

import { ProjectSection } from "./ProjectSection";
import { Task } from "@/app/types/Task";
import { CUSTOM_THEME_COLORS, ThemeName } from "@/app/types/CustomTheme";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ColorPicker } from "../../color-picker";

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
  const [customizeProjectDialogOpen, setCustomizeProjectDialogOpen] =
    useState(false);
  const [theme, setTheme] = useState<ThemeName>(
    selectedProject?.theme ?? "default"
  );

  useEffect(() => {
    if (editProjectNamePopoverOpen && selectedProject) {
      setEditingName(selectedProject.name);
    }
  }, [editProjectNamePopoverOpen, selectedProject]);

  return (
    <ProjectProvider>
      <Sidebar
        side="right"
        collapsible="none"
        className="w-[264px] h-[720px] hidden md:flex bg-zinc-50"
      >
        <SidebarContent className="gap-0">
          <ProjectSection task={task} />
          <Separator className="bg-zinc-200/70" />
          <SidebarGroup className="p-3 pt-5 gap-2.5">
            <SidebarGroupLabel className="p-0 px-2 h-auto font-semibold">
              Due date
            </SidebarGroupLabel>
            {dueDate && (
              <SidebarGroupAction
                onClick={() => {
                  setDueDate(undefined);
                  setDueTime(undefined);
                  updateTask(task.id, {
                    ...task,
                    dueDate: undefined,
                    dueTime: undefined,
                  });
                }}
              >
                <RotateCcw />
              </SidebarGroupAction>
            )}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
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
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-68 rounded-xl p-2">
                    <DropdownMenuLabel>Suggestions</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-1 items-start rounded-lg py-2 px-3">
                      <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                      <div
                        className="flex flex-col gap-0"
                        onClick={() => {
                          setDueTime(new Date(new Date().setHours(9, 0, 0, 0)));
                        }}
                      >
                        <span>9:00 AM</span>
                        <span className="text-zinc-500 text-xs">Morning</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-1 items-start rounded-lg py-2 px-3">
                      <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                      <div
                        className="flex flex-col gap-0"
                        onClick={() => {
                          setDueTime(
                            new Date(new Date().setHours(12, 0, 0, 0))
                          );
                        }}
                      >
                        <span>12:00 PM</span>
                        <span className="text-zinc-500 text-xs">Noon</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-1 items-start rounded-lg py-2 px-3"
                      onClick={() => {
                        setDueTime(new Date(new Date().setHours(15, 0, 0, 0)));
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                      <div className="flex flex-col gap-0">
                        <span>3:00 PM</span>
                        <span className="text-zinc-500 text-xs">Afternoon</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-1 items-start rounded-lg py-2 px-3"
                      onClick={() => {
                        setDueTime(new Date(new Date().setHours(18, 0, 0, 0)));
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                      <div className="flex flex-col gap-0">
                        <span>6:00 PM</span>
                        <span className="text-zinc-500 text-xs">Evening</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-1 items-start rounded-lg py-2 px-3"
                      onClick={() => {
                        setDueTime(new Date(new Date().setHours(21, 0, 0, 0)));
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                      <div className="flex flex-col gap-0">
                        <span>9:00 PM</span>
                        <span className="text-zinc-500 text-xs">Night</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="bg-zinc-200/70" />
        </SidebarContent>
      </Sidebar>
    </ProjectProvider>
  );
}
