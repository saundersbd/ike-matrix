"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "@/hooks/use-toast";

import { useState } from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  X,
  ChevronDown,
  OctagonAlert,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { THEME_COLORS, ThemeName } from "@/app/types/Theme";

export function NewTaskDialog({
  defaultDestination = "Backlog",
  inlineTrigger = false,
  theme = "sky",
  buttonVariant = "default",
  isOpen,
  onOpenChange,
}: {
  defaultDestination: string;
  inlineTrigger?: boolean;
  theme?: ThemeName;
  buttonVariant?: "default" | "outline";
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const { toast } = useToast();

  const { createTask } = useWorkspace();
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const isDialogOpen = isOpen ?? open;
  const setIsDialogOpen = onOpenChange ?? setOpen;

  const [error, setError] = useState("");

  const handleCreateTask = () => {
    // Validate title
    if (!taskText.trim()) {
      setError("You have to name a task if you hope to complete it some day.");
      return;
    }

    // Clear any previous errors
    setError("");

    createTask({
      title: taskText.trim(),
      description: taskDescriptionText.trim(),
      dueDate: dueDate
        ? format(
            dueTime
              ? new Date(
                  dueDate.setHours(dueTime.getHours(), dueTime.getMinutes())
                )
              : dueDate,
            "MMM dd, yyyy" + (dueTime ? " h:mm a" : "")
          )
        : undefined,
      quadrant: Number(
        Object.keys(quadrantTitles).find(
          (key) => quadrantTitles[Number(key)] === value.value
        )
      ),
      createdAt: new Date(),
      completed: false,
      status: "todo",
    });

    if (!continueAdding) {
      setIsDialogOpen(false);
    }
    // Reset form
    setTaskText("");
    setTaskDescriptionText("");
    setDueDate(undefined);
    setDueTime(undefined);
    setError("");
    toast({
      description: "Your task has been created.",
    });
  };

  const quadrantTitles: Record<number, string> = {
    0: "Backlog",
    1: "Important and urgent",
    2: "Important but not urgent",
    3: "Urgent but not important",
    4: "Neither urgent nor important",
  };
  const quadrantThemes: Record<number, ThemeName> = {
    0: "gray",
    1: "red",
    2: "amber",
    3: "sky",
    4: "purple",
  };

  const [value, setValue] = useState({
    value: defaultDestination,
    theme:
      quadrantThemes[
        Number(
          Object.keys(quadrantTitles).find(
            (key) => quadrantTitles[Number(key)] === defaultDestination
          )
        )
      ],
  });
  const [valueType, setValueType] = useState<"quadrant" | "backlog">(() =>
    defaultDestination === "Backlog" ? "backlog" : "quadrant"
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dueTime, setDueTime] = useState<Date | undefined>(
    new Date(new Date().setHours(12, 0, 0, 0))
  );
  const [continueAdding, setContinueAdding] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDescriptionText, setTaskDescriptionText] = useState("");
  const [showUnsavedChangesAlert, setShowUnsavedChangesAlert] = useState(false);

  const themeColors = THEME_COLORS[theme] || THEME_COLORS.sky;
  const { iconColor, hoverColor } = themeColors;

  const hasUnsavedChanges = () => {
    // Only check for actual changes from empty/initial state
    const isDefaultTime =
      !dueTime || (dueTime.getHours() === 12 && dueTime.getMinutes() === 0);

    const isDefaultDestination =
      value.value === defaultDestination ||
      (defaultDestination === "Backlog" && value.value === "Backlog");

    return !!(
      (
        taskText.trim() || // Any text entered
        taskDescriptionText.trim() || // Any description entered
        dueDate || // Date selected
        !isDefaultTime || // Time changed from default
        !isDefaultDestination
      ) // Destination changed from default
    );
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen && hasUnsavedChanges()) {
      setShowUnsavedChangesAlert(true);
    } else {
      setOpen(isOpen);
      setError("");
    }
  };

  const handleConfirmClose = () => {
    // Reset all form fields
    setTaskText("");
    setTaskDescriptionText("");
    setDueDate(undefined);
    setDueTime(undefined);
    setError("");
    setValue({
      value: defaultDestination,
      theme:
        quadrantThemes[
          Number(
            Object.keys(quadrantTitles).find(
              (key) => quadrantTitles[Number(key)] === defaultDestination
            )
          )
        ],
    });
    setShowUnsavedChangesAlert(false);
    setOpen(false);
  };

  const handleCancelClose = () => {
    setShowUnsavedChangesAlert(false);
  };

  useHotkeys(
    "mod+enter",
    (e) => {
      e.preventDefault();
      if (isDialogOpen) {
        handleCreateTask();
      }
    },
    {
      enableOnFormTags: true,
    },
    [isDialogOpen, handleCreateTask]
  );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          {inlineTrigger ? (
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", hoverColor)}
              onClick={() => {
                setValue({
                  value: defaultDestination,
                  theme:
                    quadrantThemes[
                      Number(
                        Object.keys(quadrantTitles).find(
                          (key) =>
                            quadrantTitles[Number(key)] === defaultDestination
                        )
                      )
                    ],
                });
              }}
            >
              <Plus className={iconColor} />
            </Button>
          ) : (
            <Button size="sm" className="rounded-lg" variant={buttonVariant}>
              <Plus className="w-4 h-4" />
              New task
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-3xl" hideCloseButton>
          <DialogTitle className="sr-only">Add a new task</DialogTitle>

          {error && (
            <div className="pt-6 px-5">
              <Alert variant="destructive">
                <OctagonAlert className="h-4 w-4" />
                <AlertTitle className="sr-only">Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex flex-col gap-8 p-7">
            <div className="flex flex-col gap-2">
              <Label htmlFor="task" className="sr-only">
                Type your task
              </Label>
              <div className="flex gap-3">
                <div className="flex flex-col gap-2.5 grow">
                  <TextareaAutosize
                    className="grow bg-white p-0 resize-none outline-none text-xl font-semibold"
                    placeholder="Trim the hedges"
                    id="task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <TextareaAutosize
                    className="grow bg-white p-0 resize-none outline-none text-sm"
                    placeholder="Description"
                    id="task"
                    value={taskDescriptionText}
                    onChange={(e) => setTaskDescriptionText(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 transition-all duration-200">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="chip"
                      className={cn(
                        "rounded-lg text-xs font-semibold text-zinc-700 hover:ring-zinc-300 transition-all duration-150",
                        dueDate ? "pr-1" : ""
                      )}
                    >
                      <CalendarIcon
                        className={`!w-4 !h-4 ${
                          dueDate ? "text-zinc-700" : "text-zinc-500"
                        }`}
                      />
                      {dueDate ? (
                        <span className="text-zinc-700 flex items-center gap-0.5">
                          {format(dueDate, "MMM d, yyyy")}
                          <span
                            role="button"
                            tabIndex={0}
                            className="text-zinc-600 cursor-pointer hover:bg-zinc-200 rounded p-0.5"
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
                            <X className="w-3.5 h-3.5" />
                          </span>
                        </span>
                      ) : (
                        <span className="text-zinc-500">Add date</span>
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
                        className={cn(
                          "rounded-lg text-xs font-semibold text-zinc-700 hover:ring-zinc-300 transition-all duration-150",
                          dueDate ? "pr-1" : ""
                        )}
                      >
                        <Clock
                          className={`w-4 h-4 ${
                            dueTime ? "text-zinc-700" : "text-zinc-500"
                          }`}
                        />
                        {dueTime ? (
                          <span className="flex items-center gap-0.5 text-zinc-700">
                            {format(dueTime, "h:mm a")}
                            <span
                              role="button"
                              tabIndex={0}
                              className="text-zinc-600 cursor-pointer hover:bg-zinc-200 rounded p-0.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDueTime(undefined);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.stopPropagation();
                                  setDueTime(undefined);
                                }
                              }}
                            >
                              <X className="w-3.5 h-3.5" />
                            </span>
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
                            setDueTime(
                              new Date(`1970-01-01T${e.target.value}`)
                            );
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex items-center p-3.5 border-t border-zinc-200 sm:justify-between">
            <div className="flex flex-col gap-2 transition-all duration-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-xs font-semibold text-zinc-700 hover:ring-zinc-300 transition-all duration-150 gap-1.5 pl-2.5"
                  >
                    <QuadrantSelectOption
                      label={value}
                      type={valueType}
                      padding="dense"
                    />
                    <ChevronDown className="!w-4 !h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-68">
                  <DropdownMenuLabel>Select a list</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={value.value}
                    onValueChange={(value) => {
                      setValue({
                        value: value,
                        theme:
                          quadrantThemes[
                            Number(
                              Object.keys(quadrantTitles).find(
                                (key) => quadrantTitles[Number(key)] === value
                              )
                            )
                          ],
                      });
                      setValueType(
                        value === "Backlog" ? "backlog" : "quadrant"
                      );
                    }}
                  >
                    {Object.entries(quadrantTitles).map(([key, title]) => (
                      <DropdownMenuRadioItem
                        key={key}
                        value={title}
                        className="cursor-pointer"
                      >
                        <QuadrantSelectOption
                          label={{
                            value: title,
                            theme:
                              quadrantThemes[
                                Number(key) as keyof typeof quadrantThemes
                              ],
                          }}
                          type={Number(key) === 0 ? "backlog" : "quadrant"}
                        />
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="continue"
                  checked={continueAdding}
                  onCheckedChange={setContinueAdding}
                />
                <Label htmlFor="continue" className="font-medium">
                  Continue adding
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="rounded-md"
                  variant="outline"
                  onClick={() => handleClose(false)}
                >
                  Dismiss
                </Button>
                <Button
                  size="sm"
                  className="rounded-md"
                  onClick={handleCreateTask}
                >
                  Add task
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={showUnsavedChangesAlert}
        onOpenChange={setShowUnsavedChangesAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close without
              saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClose}>
              Keep editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              Abandon changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
