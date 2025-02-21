"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    onScrollChange?: (hasScrolled: boolean) => void;
    onScrollEnd?: (hasReachedEnd: boolean) => void;
    className?: string;
  }
>(({ className, children, onScrollChange, onScrollEnd, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [isAtBottom, setIsAtBottom] = React.useState(false);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      const scrolled = viewport.scrollTop > 0;
      setHasScrolled(scrolled);
      onScrollChange?.(scrolled);

      // Check if we've scrolled to the bottom with a small threshold
      const isBottom =
        viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop <=
        1.5;
      setIsAtBottom(isBottom);
      onScrollEnd?.(isBottom);
    };

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [onScrollChange, onScrollEnd]);

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        hasScrolled && "group scroll-container",
        isAtBottom && "group scroll-bottom",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className="h-full w-full rounded-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent px-[1px] py-4",
      orientation === "horizontal" &&
        "h-4.25 flex-col border-t border-t-transparent p-[4px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-4px" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
