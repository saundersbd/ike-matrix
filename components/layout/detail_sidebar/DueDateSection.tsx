import { Task } from "@/app/types/Task";
import { useState } from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import {
  useDueDateManagement,
  TIME_PRESETS,
} from "@/hooks/use-task-date-management";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, formatDistance, addDays } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Ellipsis,
  Plus,
  Trash,
  RotateCcw,
  CalendarX2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuLabel,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function DueDateSection({ task }: { task: Task }) {
  const { updateTask } = useWorkspace();

  const [editProjectNamePopoverOpen, setEditProjectNamePopoverOpen] =
    useState(false);

  const shouldSuggestTime = (hours: number) => {
    if (!task.dueDate || !isToday(task.dueDate)) return true;
    const now = new Date();
    const currentHours = now.getHours();
    return hours > currentHours;
  };

  const {
    dueDate,
    updateDueDate,
    dueTime,
    updateDueTime,
    clearDueDateAndTime,
    extendDueDate,
    formatDueDate,
  } = useDueDateManagement(task, updateTask);

  return (
    <SidebarGroup className="p-3 gap-1.5">
      <SidebarGroupLabel>Due date</SidebarGroupLabel>
      {dueDate && (
        <SidebarGroupAction onClick={clearDueDateAndTime}>
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
                      <span className="text-red-600">
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
                onSelect={updateDueDate}
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
              <DropdownMenuContent align="end" className="w-68 py-2 rounded-xl">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="px-3 py-2.5 rounded-lg gap-1 mx-1">
                    <span>Extend due date</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      className="w-48 rounded-xl py-2"
                      alignOffset={-5}
                    >
                      <DropdownMenuLabel className="px-3">
                        Extend by
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="px-3 py-2.5 rounded-lg gap-1 mx-1"
                        onClick={() => {
                          const newDate = addDays(dueDate, 1);
                          updateDueDate(newDate);
                        }}
                      >
                        24 hours
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="px-3 py-2.5 rounded-lg gap-1 mx-1"
                        onClick={() => {
                          const newDate = addDays(dueDate, 7);
                          updateDueDate(newDate);
                        }}
                      >
                        One week
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  className="px-3 py-2.5 rounded-lg gap-2.5 mx-1 text-red-600 focus:text-red-600"
                  onClick={clearDueDateAndTime}
                >
                  <CalendarX2 className="w-3.5 h-3.5" />
                  Remove due date
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
            <DropdownMenuContent className="w-68 rounded-xl py-2">
              <DropdownMenuLabel className="px-3">
                Suggestions
              </DropdownMenuLabel>
              {shouldSuggestTime(TIME_PRESETS.MORNING.hours) && (
                <DropdownMenuItem className="gap-1 items-start rounded-lg py-2 px-3 mx-1">
                  <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                  <div
                    className="flex flex-col gap-0"
                    onClick={() => {
                      updateDueTime(TIME_PRESETS.MORNING.hours);
                    }}
                  >
                    <span>9:00 AM</span>
                    <span className="text-zinc-500 text-xs">Morning</span>
                  </div>
                </DropdownMenuItem>
              )}
              {shouldSuggestTime(TIME_PRESETS.NOON.hours) && (
                <DropdownMenuItem className="gap-1 items-start rounded-lg py-2 px-3 mx-1">
                  <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                  <div
                    className="flex flex-col gap-0"
                    onClick={() => {
                      updateDueTime(TIME_PRESETS.NOON.hours);
                    }}
                  >
                    <span>12:00 PM</span>
                    <span className="text-zinc-500 text-xs">Noon</span>
                  </div>
                </DropdownMenuItem>
              )}
              {shouldSuggestTime(TIME_PRESETS.AFTERNOON.hours) && (
                <DropdownMenuItem
                  className="gap-1 items-start rounded-lg py-2 px-3 mx-1"
                  onClick={() => {
                    updateDueTime(TIME_PRESETS.AFTERNOON.hours);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                  <div className="flex flex-col gap-0">
                    <span>3:00 PM</span>
                    <span className="text-zinc-500 text-xs">Afternoon</span>
                  </div>
                </DropdownMenuItem>
              )}
              {shouldSuggestTime(TIME_PRESETS.EVENING.hours) && (
                <DropdownMenuItem
                  className="gap-1 items-start rounded-lg py-2 px-3 mx-1"
                  onClick={() => {
                    updateDueTime(TIME_PRESETS.EVENING.hours);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                  <div className="flex flex-col gap-0">
                    <span>6:00 PM</span>
                    <span className="text-zinc-500 text-xs">Evening</span>
                  </div>
                </DropdownMenuItem>
              )}
              {shouldSuggestTime(TIME_PRESETS.NIGHT.hours) && (
                <DropdownMenuItem
                  className="gap-1 items-start rounded-lg py-2 px-3 mx-1"
                  onClick={() => {
                    updateDueTime(TIME_PRESETS.NIGHT.hours);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2 mt-[.2rem]" />
                  <div className="flex flex-col gap-0">
                    <span>9:00 PM</span>
                    <span className="text-zinc-500 text-xs">Night</span>
                  </div>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                className="px-3 py-2.5 rounded-lg gap-1 mx-1"
                onClick={clearDueDateAndTime}
              >
                <Plus className="w-4 h-4 mr-2" />
                Custom time
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
