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
} from "@/components/ui/dropdown-menu";

export function DueDateSection({ task }: { task: Task }) {
  const { updateTask } = useWorkspace();

  const [editProjectNamePopoverOpen, setEditProjectNamePopoverOpen] =
    useState(false);

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
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="px-2.5 py-2 rounded-lg">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Extend due date</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      className="w-48 rounded-xl"
                      alignOffset={-5}
                    >
                      <DropdownMenuItem className="px-2.5 py-2 rounded-lg">
                        One day
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="px-2.5 py-2 rounded-lg"
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
                <DropdownMenuItem
                  className="px-2.5 py-2 rounded-lg"
                  onClick={clearDueDateAndTime}
                >
                  <Trash className="w-3.5 h-3.5" />
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
                    updateDueTime(TIME_PRESETS.MORNING.hours);
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
                    updateDueTime(TIME_PRESETS.NOON.hours);
                  }}
                >
                  <span>12:00 PM</span>
                  <span className="text-zinc-500 text-xs">Noon</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-1 items-start rounded-lg py-2 px-3"
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
              <DropdownMenuItem
                className="gap-1 items-start rounded-lg py-2 px-3"
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
              <DropdownMenuItem
                className="gap-1 items-start rounded-lg py-2 px-3"
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
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
