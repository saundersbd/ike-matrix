import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
type QuadrantTitle = keyof typeof QUADRANT_COLORS;

interface QuadrantProps {
  title: QuadrantTitle;
  children?: React.ReactNode;
}

const QUADRANT_COLORS = {
  "Important and urgent": "bg-red-50",
  "Important but not urgent": "bg-teal-50",
  "Urgent but not important": "bg-amber-50",
  "Not urgent or important": "bg-sky-50",
};

const textColor = {
  "Important and urgent": "text-red-700",
  "Important but not urgent": "text-teal-700",
  "Urgent but not important": "text-amber-800",
  "Not urgent or important": "text-sky-700",
};

const iconColor = {
  "Important and urgent": "text-red-700",
  "Important but not urgent": "text-teal-700",
  "Urgent but not important": "text-amber-800",
  "Not urgent or important": "text-sky-700",
};

export function Quadrant({ title, children }: QuadrantProps) {
  return (
    <div className="flex flex-col rounded-2xl shadow-sm overflow-hidden ring-1 ring-black/[.08]">
      <header
        className={`shrink-0 py-3 pl-5 pr-4 flex items-center justify-between ${QUADRANT_COLORS[title]}`}
      >
        <h2 className={cn(textColor[title], "text-sm font-semibold")}>
          {title}
        </h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className={iconColor[title]} />
        </Button>
      </header>
      <ScrollArea className="grow px-3 bg-white">
        <div className="flex flex-col gap-0 py-4">{children}</div>
      </ScrollArea>
    </div>
  );
}
