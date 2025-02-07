import { useState } from "react";
import { Project } from "@/app/types/Project";
import { ThemeName } from "@/app/types/CustomTheme";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/controls/color-picker";
import { Ellipsis, Pencil, SwatchBook, Trash } from "lucide-react";

interface ProjectActionsMenuProps {
  project: Project;
  onNameChange: (name: string) => void;
  onThemeChange: (theme: ThemeName) => void;
  onDelete: () => void;
}

export function ProjectActionsMenu({
  project,
  onNameChange,
  onThemeChange,
  onDelete,
}: ProjectActionsMenuProps) {
  const [editNameDialogOpen, setEditNameDialogOpen] = useState(false);
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [editingName, setEditingName] = useState(project.name);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(
    project.theme ?? "default"
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="shrink-0 cursor-pointer w-7 h-7 rounded-md transition-colors duration-200 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
          >
            <Ellipsis className="w-3.5 h-3.5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setCustomizeDialogOpen(true);
            }}
          >
            <SwatchBook className="w-3.5 h-3.5 mr-2" />
            Customize
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setEditNameDialogOpen(true);
            }}
          >
            <Pencil className="w-3.5 h-3.5 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onDelete();
            }}
          >
            <Trash className="w-3.5 h-3.5 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={editNameDialogOpen} onOpenChange={setEditNameDialogOpen}>
        <DialogContent className="p-0 max-w-[348px]">
          <DialogHeader className="p-5 pb-0">
            <DialogTitle className="text-lg font-medium">
              Edit project name
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 p-5">
            <Input
              className="text-lg font-medium"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
            />
          </div>
          <DialogFooter className="p-5 pt-0">
            <Button
              variant="outline"
              onClick={() => {
                setEditNameDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onNameChange(editingName);
                setEditNameDialogOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={customizeDialogOpen} onOpenChange={setCustomizeDialogOpen}>
        <DialogContent className="p-0 max-w-[348px]">
          <DialogHeader className="px-5 pt-6 pb-0">
            <DialogTitle>Customize project</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 p-5">
            <ColorPicker
              theme={project.theme}
              onValueChange={(value) => {
                setSelectedTheme(value);
              }}
            />
          </div>
          <DialogFooter className="p-5 pt-0">
            <Button
              variant="outline"
              onClick={() => {
                setCustomizeDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onThemeChange(selectedTheme);
                setCustomizeDialogOpen(false);
              }}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
