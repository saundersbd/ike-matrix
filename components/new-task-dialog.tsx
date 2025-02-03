"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import {
  Plus,
  ArrowUpDown,
  Calendar as CalendarIcon,
  Clock,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { THEME_COLORS, THEME_COLORS_LIST, ThemeName } from "@/app/types/Theme";

export function NewTaskDialog({
  defaultDestination = "Backlog",
  inlineTrigger = false,
  theme = "sky",
}: {
  defaultDestination: string;
  inlineTrigger?: boolean;
  theme?: ThemeName;
}) {
  const quadrantTitles: Record<number, string> = {
    0: "Important and urgent",
    1: "Important but not urgent",
    2: "Urgent but not important",
    3: "Not urgent or important",
  };
  const quadrantThemes: Record<number, ThemeName> = {
    0: "red",
    1: "amber",
    2: "sky",
    3: "gray",
  };

  const [value, setValue] = useState(defaultDestination);
  const [valueType, setValueType] = useState<"quadrant" | "backlog">(() =>
    defaultDestination === "Backlog" ? "backlog" : "quadrant"
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dueTime, setDueTime] = useState<Date | undefined>(undefined);
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const { iconColor, hoverColor } = themeColors;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {inlineTrigger ? (
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", hoverColor)}
            onClick={() => {
              setValue(defaultDestination);
            }}
          >
            <Plus className={iconColor} />
          </Button>
        ) : (
          <Button size="sm" className="rounded-lg">
            <Plus className="w-4 h-4" />
            New task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8 px-5 pt-3 pb-5">
          <div className="flex flex-col gap-2 px-0.5">
            <Label htmlFor="task" className="sr-only">
              Type your task
            </Label>
            <div className="flex gap-3">
              <div className="flex shrink-0 pt-1">
                <Checkbox disabled className="disabled:cursor-default" />
              </div>
              <TextareaAutosize
                className="grow bg-white p-0 resize-none outline-none"
                placeholder="Start typing..."
                id="task"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 transition-all duration-200">
            <div className="flex flex-col gap-2 transition-all duration-200">
              <Label className="sr-only">Select a destination</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="chip"
                    className="rounded-lg text-xs font-semibold text-zinc-700"
                  >
                    <QuadrantSelectOption
                      label={value}
                      type={valueType}
                      padding="dense"
                      theme={theme}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-68">
                  <DropdownMenuLabel>Select a list</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={value}
                    onValueChange={(value) => {
                      setValue(value);
                      setValueType(
                        value === "Backlog" ? "backlog" : "quadrant"
                      );
                    }}
                  >
                    <DropdownMenuRadioItem
                      value="Backlog"
                      className="cursor-pointer"
                    >
                      <QuadrantSelectOption label="Backlog" type="backlog" />
                    </DropdownMenuRadioItem>
                    {Object.entries(quadrantTitles).map(([key, title]) => (
                      <DropdownMenuRadioItem
                        key={key}
                        value={title}
                        className="cursor-pointer"
                      >
                        <QuadrantSelectOption
                          label={title}
                          theme={
                            quadrantThemes[
                              Number(key) as keyof typeof quadrantThemes
                            ]
                          }
                          type="quadrant"
                        />
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="chip"
                    className="rounded-lg text-xs font-semibold text-zinc-700"
                  >
                    <CalendarIcon
                      className={`!w-4 !h-4 ${
                        dueDate ? "text-zinc-700" : "text-zinc-500"
                      }`}
                    />
                    {dueDate ? (
                      <span className="text-zinc-700 flex items-center gap-1">
                        {format(dueDate, "MMM d, yyyy")}
                        <span
                          role="button"
                          tabIndex={0}
                          className="cursor-pointer hover:bg-zinc-200 rounded p-0.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDueDate(undefined);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              setDueDate(undefined);
                            }
                          }}
                        >
                          <X className="w-4 h-4" />
                        </span>
                      </span>
                    ) : (
                      <span className="text-zinc-500">Due date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {dueDate && (
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="chip"
                      className="rounded-lg text-xs font-semibold text-zinc-700"
                    >
                      <Clock
                        className={`w-4 h-4 ${
                          dueTime ? "text-zinc-700" : "text-zinc-500"
                        }`}
                      />
                      {dueTime ? (
                        <span className="text-zinc-700">
                          {format(dueTime, "h:mm a")}
                        </span>
                      ) : (
                        <span className="text-zinc-500">Time</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-5">
                    <div className="flex flex-col gap-2 w-48">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        type="time"
                        id="time"
                        value={dueTime ? format(dueTime, "HH:mm") : ""}
                        onChange={(e) => {
                          setDueTime(new Date(`1970-01-01T${e.target.value}`));
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="flex items-center pt-2 gap-2">
          <Button size="sm" className="rounded-md">
            Submit
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox id="continue" />
            <Label htmlFor="continue">Add another</Label>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
