"use client";

import { forwardRef, ComponentPropsWithoutRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

// ===== Base Exports =====
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

// ===== Style =====
const base =
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none origin-[--radix-popover-content-transform-origin]";

const stateOpen =
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95";
const stateClosed =
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

const sideAnimation =
  "data-[side=bottom]:slide-in-from-top-2 " +
  "data-[side=left]:slide-in-from-right-2 " +
  "data-[side=right]:slide-in-from-left-2 " +
  "data-[side=top]:slide-in-from-bottom-2";

const popoverClass = cn(base, stateOpen, stateClosed, sideAnimation);

// ===== Content =====
const PopoverContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverClass, className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// ===== Export All =====
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
