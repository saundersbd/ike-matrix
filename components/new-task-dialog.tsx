"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { QuadrantSelectOption } from "@/components/quadrant-select-option";
import { THEME_COLORS, THEME_COLORS_LIST, ThemeName } from "@/app/types/Theme";

export function NewTaskDialog() {
  const quadrantTitles: Record<number, string> = {
    1: "Important and urgent",
    2: "Important but not urgent",
    3: "Urgent but not important",
    4: "Not urgent or important",
  };
  const quadrantThemes: Record<number, ThemeName> = {
    1: "red",
    2: "amber",
    3: "sky",
    4: "gray",
  };

  const [value, setValue] = useState("Backlog");
  const [valueType, setValueType] = useState<"quadrant" | "backlog">("backlog");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-lg">
          <Plus className="w-4 h-4" />
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 px-5 pb-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task" className="sr-only">
              Task description
            </Label>
            <TextareaAutosize
              className="w-full bg-zinc-100 rounded-md py-2.5 px-3 resize-none"
              placeholder="Start typing..."
              id="task"
            />
          </div>
          <Button variant="link" size="sm" className="w-fit">
            Add due date
          </Button>
        </div>
        <DialogFooter className="flex items-center sm:justify-between border-t border-zinc-200 pt-4">
          <div className="flex flex-col gap-2">
            <Label className="sr-only">Select a destination</Label>
            <Select
              value={value}
              onValueChange={(value) => {
                setValue(value);
                setValueType(value === "Backlog" ? "backlog" : "quadrant");
              }}
              name="destination"
            >
              <SelectTrigger className="w-[272px]">
                <SelectValue>
                  <QuadrantSelectOption
                    label={value}
                    type={valueType}
                    theme={
                      quadrantThemes[
                        Number(
                          Object.entries(quadrantTitles).find(
                            ([_, title]) => title === value
                          )?.[0]
                        ) as keyof typeof quadrantThemes
                      ]
                    }
                  />
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Backlog" className="cursor-pointer">
                  <QuadrantSelectOption label="Backlog" type="backlog" />
                </SelectItem>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Quadrants</SelectLabel>
                  {Object.entries(quadrantTitles).map(([key, title]) => (
                    <SelectItem
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
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button>Add task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
