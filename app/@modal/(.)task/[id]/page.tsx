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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { useRouter } from "next/navigation";
import { use } from "react";
import { ThemeName } from "@/app/types/Theme";
import { DetailsSidebar } from "@/components/details-sidebar";
import { ChevronDown } from "lucide-react";

export default function TaskModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { tasks, updateTask } = useWorkspace();
  const router = useRouter();
  const pathname = usePathname();
  const { id } = use(params);
  const task = tasks.find((t) => t.id === id);
  const [open, setOpen] = useState(true);

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
    <Dialog open={open} onOpenChange={handleClose} modal={true}>
      <DialogContent className="flex flex-col p-0 overflow-y-auto max-h-[720px] max-w-4xl">
        <DialogHeader className="px-6 py-5 border-b border-zinc-200">
          <DialogTitle className="sr-only">Task details</DialogTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="chip"
                className="w-max rounded-lg text-xs font-semibold text-zinc-700 hover:ring-zinc-300 transition-all duration-150"
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
        </DialogHeader>

        <SidebarProvider className="overflow-hidden items-start min-h-[100px]">
          <div className="flex flex-1 gap-3.5 p-6 pb-8 overflow-hidden h-[720px]">
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
                    <p className="text-sm text-zinc-500">{task?.description}</p>
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
  );
}
