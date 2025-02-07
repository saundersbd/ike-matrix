"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleHelp } from "lucide-react";

export function InfoSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="text-zinc-100 font-semibold underline decoration-dotted decoration-zinc-300 decoration-1 underline-offset-4 hover:text-white hover:decoration-zinc-50"
        >
          <span>The method</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl sm:w-[540px] p-0">
        <SheetHeader className="h-[64px] flex flex-row items-center justify-between px-5 mb-2 border-b border-zinc-200">
          <SheetTitle>The Einsehower method</SheetTitle>
          <SheetClose />
        </SheetHeader>

        <div className="p-5">
          <h2 className="text-xl font-semibold mb-2">
            Understanding the Eisenhower Matrix
          </h2>
          <p className="mb-4">
            Use this app to prioritize tasks effectively using the Eisenhower
            Matrix. Begin by adding tasks to your list, then categorize each one
            based on urgency and importance. The app will automatically sort
            tasks into four quadrants, helping you focus on what matters most.
          </p>

          <h2 className="text-xl font-semibold mb-2">The Four Quadrants</h2>
          <p className="mb-4">
            Assign each task to a quadrant: urgent and important tasks should be
            completed immediately, important but not urgent tasks should be
            scheduled, urgent but not important tasks can be delegated, and
            neither urgent nor important tasks can be removed or postponed.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Applying the Eisenhower Matrix
          </h2>
          <p className="mb-4">
            Regularly review and update your tasks to stay on track. Use filters
            and sorting options to manage workload efficiently. By following
            this system, you’ll improve productivity and focus on what truly
            moves you forward.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
