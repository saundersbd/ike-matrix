import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300",
  {
    variants: {
      variant: {
        default:
          "bg-violet-800 text-stone-100 hover:bg-violet-700/[.97] dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 font-semibold",
        destructive:
          "bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90",
        outline:
          "ring-1 ring-stone-200 bg-white hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        secondary:
          "bg-stone-300/40 text-stone-900 hover:bg-stone-300/60 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80",
        ghost:
          "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        link: "text-stone-900 underline-offset-4 hover:underline dark:text-stone-50 !px-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        chip: "h-7 pr-2.5 pl-1.75 py-1",
        xs: "h-8 rounded-md px-2.5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-8 w-8 rounded-md",
        "icon-lg": "h-9 w-9 rounded-md",
        fab: "w-[2.8rem] h-[2.8rem] shadow-sm ring-1 ring-black/[.08] rounded-full bg-white hover:bg-stone-50 hover:ring-black/[.12] hover:shadow-xs transition-all duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
