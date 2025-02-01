import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export function Quadrant({ title, children }: QuadrantProps) {
  return (
    <div className="flex flex-col rounded-2xl shadow-sm overflow-hidden border-black/[.08] border">
      <header
        className={`shrink-0 border-b border-zinc-200 pt-4 pb-6 px-5 flex items-center ${QUADRANT_COLORS[title]}`}
      >
        <h2 className={cn(textColor[title], "text-sm font-semibold")}>
          {title}
        </h2>
      </header>
      <ScrollArea className="grow px-4 -mt-[12px] bg-white">
        <div className="flex flex-col gap-2 py-4">{children}</div>
      </ScrollArea>
    </div>
  );
}
