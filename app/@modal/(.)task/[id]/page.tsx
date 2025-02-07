"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { useRouter } from "next/navigation";
import { use } from "react";
import { ThemeName } from "@/app/types/Theme";
import { DetailsSidebar } from "@/components/layout/detail_sidebar/DetailsSidebar";
import { Archive, ChevronDown, Ellipsis, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/dialogs/ConfirmationDialog";

export default function TaskModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { tasks, updateTask, deleteTask } = useWorkspace();
  const router = useRouter();
  const pathname = usePathname();
  const { id } = use(params);
  const task = tasks.find((t) => t.id === id);
  const [open, setOpen] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (pathname.includes(`/task/${id}`)) {
      setOpen(true); // Reset open state when navigating to the same task
    }
  }, [pathname, id]);

  const handleQuadrantChange = (quadrant: number) => {
    if (task?.id) {
      updateTask(task.id, { quadrant });
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
      router.replace("/", { scroll: false });
      router.refresh();
    }, 0);
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (task?.id) {
      updateTask(task.id, { completed: checked });
    }
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
      <Dialog open={open} onOpenChange={handleClose} modal={true}>
        <DialogContent className="flex flex-col p-0 overflow-y-auto max-h-[80svh] max-w-4xl">
          <DialogHeader className="h-[64px] flex flex-row shrink-0 items-center justify-between pl-5 pr-16 py-4.5 border-b border-zinc-200">
            <DialogTitle className="sr-only">Task details</DialogTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="chip"
                  className="w-max rounded-lg text-xs font-semibold text-zinc-700 hover:ring-zinc-300 transition-all duration-150 mb-0"
                >
                  <QuadrantSelectOption
                    label={{
                      value: quadrantTitles[task?.quadrant || 0],
                      theme: quadrantThemes[task?.quadrant || 0],
                    }}
                    type={task?.quadrant === 0 ? "backlog" : "quadrant"}
                    padding="dense"
                  />
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-68">
                <DropdownMenuLabel>Select a list</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={quadrantTitles[task?.quadrant || 0]}
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
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-zinc-700 hover:text-zinc-900"
                  >
                    <Ellipsis className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 rounded-xl" align="end">
                  <DropdownMenuItem className="px-2.5 py-2 rounded-lg">
                    <Archive className="w-4 h-4" />
                    <span>Archive task</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="px-2.5 py-2 rounded-lg text-red-600 focus:text-red-700"
                    onClick={() => setShowConfirmDelete(true)}
                  >
                    <Trash className="w-4 h-4" />
                    <span>Delete task</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DialogHeader>

          <SidebarProvider className="overflow-hidden items-start min-h-[100px]">
            <div className="flex flex-1 gap-3.5 p-6 pb-8 overflow-hidden h-[calc(80svh-64px)]">
              <Checkbox
                className="shrink-0 mt-[2px]"
                checked={task?.completed || false}
                onCheckedChange={handleCheckboxChange}
              />
              <div className="flex flex-col grow gap-8">
                <div className="flex flex-col gap-3">
                  <h1 className="text-lg font-medium leading-snug">
                    {task?.title}
                  </h1>
                  {task?.description && (
                    <div>
                      <p className="text-sm text-zinc-500">
                        {task?.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {task && <DetailsSidebar task={task} />}
          </SidebarProvider>
          {/* <DialogFooter className="shrink-0 py-4 px-5 border-t border-zinc-200">
            <Button size="sm" disabled={!hasChanges} onClick={handleSave}>
              Save and close
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        open={showConfirmDelete}
        onOpenChange={setShowConfirmDelete}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to close without saving?"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={() => {
          deleteTask(task?.id || "");
          handleClose();
        }}
        onCancel={() => setShowConfirmDelete(false)}
      />
    </>
  );
}
