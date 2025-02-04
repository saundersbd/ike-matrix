"use client";

import { useTasks } from "@/app/contexts/TaskContext";
import { useState } from "react";

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
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { Task } from "@/app/types/Task";
import { useRouter } from "next/navigation";
import { use } from "react";
import { ThemeName } from "@/app/types/Theme";

export default function TaskModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { tasks, updateTask } = useTasks();
  const router = useRouter();
  const { id } = use(params);
  const [showUnsavedChangesAlert, setShowUnsavedChangesAlert] = useState(false);

  const [localTask, setLocalTask] = useState<Task | undefined>(
    tasks.find((t) => t.id === id)
  );

  const originalTask = tasks.find((t) => t.id === id);

  if (!originalTask || !localTask) {
    return null;
  }

  const hasChanges =
    localTask?.quadrant !== originalTask?.quadrant ||
    localTask?.completed !== originalTask?.completed;

  const handleQuadrantChange = (quadrant: number) => {
    setLocalTask({ ...localTask, quadrant });
  };

  const handleSave = () => {
    // Only update the actual task state when saving
    updateTask(localTask.id, {
      quadrant: localTask.quadrant,
      completed: localTask.completed,
    });
    router.back();
  };

  const handleClose = () => {
    if (hasChanges) {
      setShowUnsavedChangesAlert(true);
    } else {
      router.back();
    }
  };

  const handleConfirmClose = () => {
    setLocalTask(originalTask);
    setShowUnsavedChangesAlert(false);
    router.back();
  };

  const handleCancelClose = () => {
    setShowUnsavedChangesAlert(false);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setLocalTask({ ...localTask, completed: checked });
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

  return (
    <>
      <Dialog open onOpenChange={handleClose} modal={true}>
        <DialogContent className="flex flex-col grow p-0 overflow-y-auto min-h-[70vh] max-h-[85vh] max-w-3xl">
          <DialogTitle className="sr-only">Edit task</DialogTitle>

          <div className="flex grow gap-3.5 p-6 pb-8">
            <Checkbox
              className="shrink-0 mt-[4px]"
              checked={localTask.completed}
              onCheckedChange={handleCheckboxChange}
            />
            <div className="flex flex-col grow gap-8">
              <div className="flex flex-col gap-3">
                <h1 className="text-lg font-medium leading-snug">
                  {localTask.title}
                </h1>
                {localTask.description && (
                  <div>
                    <p className="text-sm text-zinc-500">
                      {localTask.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="chip"
                      className="rounded-lg text-xs font-semibold text-zinc-700 hover:ring-zinc-300 transition-all duration-150"
                    >
                      <QuadrantSelectOption
                        label={{
                          value: quadrantTitles[localTask.quadrant],
                          theme: quadrantThemes[localTask.quadrant],
                        }}
                        type={localTask.quadrant === 0 ? "backlog" : "quadrant"}
                        padding="dense"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-68">
                    <DropdownMenuLabel>Select a list</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={quadrantTitles[localTask.quadrant]}
                      onValueChange={(value) => {
                        handleQuadrantChange(
                          Number(
                            Object.keys(quadrantTitles).find(
                              (key) => quadrantTitles[Number(key)] === value
                            )
                          ) || 0
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
            </div>
          </div>
          <DialogFooter className="shrink-0 py-4 px-5 border-t border-zinc-200">
            <Button size="sm" disabled={!hasChanges} onClick={handleSave}>
              Save and close
            </Button>
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
