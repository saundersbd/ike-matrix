import { cn } from "@/lib/utils";

type QuadrantTitle = keyof typeof QUADRANT_COLORS;

interface QuadrantProps {
  title: QuadrantTitle;
  children?: React.ReactNode;
}

const QUADRANT_COLORS = {
  "Important and urgent": "bg-red-100",
  "Important but not urgent": "bg-teal-100",
  "Urgent but not important": "bg-amber-100",
  "Not urgent or important": "bg-sky-100",
};

const textColor = {
  "Important and urgent": "text-red-700",
  "Important but not urgent": "text-teal-700",
  "Urgent but not important": "text-amber-800",
  "Not urgent or important": "text-sky-700",
};

export function Quadrant({ title, children }: QuadrantProps) {
  return (
    <div className="flex flex-col rounded-xl shadow-sm">
      <header
        className={`shrink-0 border-b border-zinc-200 pt-4 pb-6 px-5 flex items-center rounded-tl-xl rounded-tr-xl ${QUADRANT_COLORS[title]}`}
      >
        <h2 className={cn(textColor[title], "text-sm font-semibold")}>
          {title}
        </h2>
      </header>
      <div className="grow p-5 rounded-xl ring-1 ring-black/[.08] -mt-[12px] bg-white">
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}
