import { useState } from "react";

import { Plus, FolderOpen, FolderClosed } from "lucide-react";

import { StopLight } from "@/components/controls/stop-light";
import { ViewSwitcher } from "@/components/controls/view-switcher";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

interface ToolbarProps {
  visibilityControls: boolean[];
  setVisibilityControls: (controls: boolean[]) => void;
  setOpen: (open: boolean) => void;
  setView: (view: "grid" | "list") => void;
  handleOpenNewTaskDialog: (quadrantId: number) => void;
  onToggleChange: (pressed: boolean) => void;
  isSidebarOpen: boolean;
}

export function Toolbar({
  visibilityControls,
  setVisibilityControls,
  setOpen,
  setView,
  handleOpenNewTaskDialog,
  onToggleChange,
  isSidebarOpen,
}: ToolbarProps) {
  return (
    <div
      className={cn(
        "h-15 flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 bg-white/90 drop-shadow-md ring-1 ring-black/[.05]"
      )}
    >
      <Toggle
        defaultPressed={true}
        className={cn(
          "group h-9 w-9 min-w-9 flex items-center justify-center ring-1 ring-zinc-200/80 bg-white data-[state=on]:bg-white rounded-full"
        )}
        onPressedChange={(pressed) => {
          setOpen(pressed);
          onToggleChange(pressed);
        }}
      >
        {isSidebarOpen ? (
          <FolderOpen className="w-4 h-4" />
        ) : (
          <FolderClosed className="w-4 h-4" />
        )}
      </Toggle>

      <StopLight
        selection={visibilityControls}
        onSelectionChange={setVisibilityControls}
        onToggleChange={(toggle) => {
          setOpen(toggle);
        }}
      />

      <ViewSwitcher setView={setView} />

      <Separator orientation="vertical" className="h-5 mx-1" />

      <Button
        size="icon"
        className="h-10 w-10 -mr-0.5 rounded-full"
        onClick={() => handleOpenNewTaskDialog(0)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
