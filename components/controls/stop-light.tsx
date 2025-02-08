import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Circle } from "lucide-react";

interface StopLightProps {
  selection: boolean[];
  onSelectionChange: (selection: boolean[]) => void;
  onToggleChange: (toggle: boolean) => void;
}

export default function StopLight({
  selection,
  onSelectionChange,
  onToggleChange,
}: StopLightProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex items-center gap-3">
      <Toggle
        defaultPressed={true}
        className={cn(
          "group h-9 w-9 min-w-9 flex items-center justify-center ring-1 ring-zinc-200 bg-white rounded-full"
        )}
        onPressedChange={(pressed) => {
          setOpen(pressed);
          onToggleChange(pressed);
        }}
      >
        <Circle
          className={cn(
            "!w-[11px] !h-[11px] fill-zinc-500 text-zinc-500",
            !open && "fill-zinc-200 text-zinc-200"
          )}
        />
      </Toggle>
      <ToggleGroup
        type="multiple"
        className="h-9 p-1 ring-1 ring-zinc-200 bg-white rounded-full gap-0"
        value={selection
          .map((control, index) => (control ? index.toString() : null))
          .filter((value): value is string => value !== null)}
        onValueChange={(value) =>
          onSelectionChange(
            [0, 1, 2, 3].map((i) => value.includes(i.toString()))
          )
        }
      >
        <ToggleGroupItem value="0" size="sm" className="rounded-full h-8">
          <Circle
            className={cn(
              "!w-[11px] !h-[11px] fill-red-500 text-red-500",
              selection[0] &&
                "fill-red-200/70 text-red-200/70 group-hover:fill-red-500 group-hover:text-red-500 transition-colors duration-200"
            )}
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="1" size="sm" className="rounded-full h-8">
          <Circle
            className={cn(
              "!w-[11px] !h-[11px] fill-amber-400 text-amber-400",
              selection[1] &&
                "fill-amber-200 text-amber-200 group-hover:fill-amber-400 group-hover:text-amber-400 transition-colors duration-200"
            )}
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="2" size="sm" className="rounded-full h-8">
          <Circle
            className={cn(
              "!w-[11px] !h-[11px] fill-sky-500 text-sky-500",
              selection[2] &&
                "fill-sky-200/70 text-sky-200/70 group-hover:fill-sky-500 group-hover:text-sky-500 transition-colors duration-200"
            )}
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="3" size="sm" className="rounded-full h-8">
          <Circle
            className={cn(
              "!w-[11px] !h-[11px] fill-purple-500 text-purple-500",
              selection[3] &&
                "fill-purple-200/90 text-purple-200/90 group-hover:fill-purple-500 group-hover:text-purple-500 transition-colors duration-200"
            )}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
