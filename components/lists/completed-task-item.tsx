"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Task } from "@/app/types/Task";
import { Check, Ellipsis, Trash, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CompletedTaskItemProps {
  task: Task;
}
export function CompletedTaskItem({ task }: CompletedTaskItemProps) {
  const { updateTask, projects } = useWorkspace();

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 pl-3.5 pr-2 py-2 transition-all duration-200",
        "bg-white hover:bg-zinc-50/[.99] shadow-xs ring-1 ring-black/[.05] rounded-[12px]"
      )}
    >
      <div className="flex items-center justify-center size-5 gap-2 bg-zinc-200/60 rounded-full">
        <Check className="size-2.5 text-zinc-600" strokeWidth={2.5} />
      </div>
      <Link
        href={`/task/${task.id}`}
        className="group/task-list-item flex grow flex-col gap-0.5 pointer-events-auto text-zinc-600"
      >
        <p className="grow text-sm leading-snug font-medium">{task.title}</p>
      </Link>
      {task.completedAt && (
        <span className="text-xs text-zinc-500">
          Completed{" "}
          {formatDistance(task.completedAt, new Date(), {
            addSuffix: true,
          })}
        </span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-zinc-200/60">
            <Ellipsis className="size-4 text-zinc-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" collisionPadding={{ right: 20 }}>
          <DropdownMenuItem>
            <Undo2 className="size-4" />
            <span>Take it back</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <Trash className="size-4" />
            <span>Delete forever</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
