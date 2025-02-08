import { cn } from "@/lib/utils";
import { Pill } from "@/components/common/pill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { LucideIcon } from "lucide-react";
export function CardHeader({
  title,
  pill,
  popover,
}: {
  title: string;
  pill?: string;
  popover?: {
    icon?: LucideIcon;
    content: React.ReactNode;
  };
}) {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3 gap-3 bg-zinc-white border-b border-zinc-200/80 h-[52px]">
      <div className="flex items-center gap-2.5 min-h-8">
        <h2 className={cn("text-sm font-semibold inline-flex text-zinc-800")}>
          {title}
        </h2>
        {pill && (
          <Pill label={pill} theme="subtleGray" className="!bg-zinc-200/60" />
        )}
      </div>
      {popover && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 hover:bg-zinc-200/40 text-zinc-600 hover:text-zinc-800"
              )}
            >
              {popover.icon ? (
                <popover.icon className="w-4 h-4" />
              ) : (
                <Info className="w-4 h-4" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-76 text-sm" dark>
            {popover.content}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
