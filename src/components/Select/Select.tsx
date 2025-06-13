"use client";

import { forwardRef, HTMLAttributes, ComponentPropsWithoutRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** select style */
const selectDisabledStyle =
  "disabled:cursor-not-allowed  disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-200";
const selectFocusStyle = "focus:outline-none";
const selectPlaceStyle = "data-[placeholder]:text-gray-900";
const selectKeepSpanStyle = "[&>span]:line-clamp-1";
const selectStyle = `flex items-center justify-between whitespace-nowrap border border-gray-200 bg-transparent w-full text-gray-900 group ${selectDisabledStyle} ${selectFocusStyle} ${selectPlaceStyle} ${selectKeepSpanStyle}`;

const SelectVariants = cva(selectStyle, {
  variants: {
    size: {
      xs: "h-8 px-2 py-1.5 body02m rounded-sm",
      sm: "h-8 px-4 py-1.5 body02m rounded-sm",
      md: "h-10 px-4 py-[9px] rounded-md body02m",
      lg: "h-12 px-4 py-3 body01m rounded-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof SelectVariants> {}

const SelectTrigger = forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, size, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(SelectVariants({ size, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          className={cn(
            "group-data-[state=open]:rotate-180 duration-300 transition-transform",
            size === "lg" ? "h-3.5 w-3.5" : "h-4 w-3"
          )}
          color="#111"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/** selectContent style */
const selectContentOpenStyle =
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95";
const selectContentCloseStyle =
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";
const selectContentDataSideStyle =
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
const selectContentStyle = `relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground origin-[--radix-select-content-transform-origin ${selectContentOpenStyle} ${selectContentCloseStyle} ${selectContentDataSideStyle}`;

const SelectContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        selectContentStyle,
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/** selectItem style */
const selectItemDisabledStyle =
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
const selectItemFocusStyle = "focus:bg-accent focus:text-accent-foreground";
const selectItemStyle = `relative flex w-full h-[var(--radix-select-trigger-height)] cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 body02m outline-none ${selectItemDisabledStyle} ${selectItemFocusStyle}`;
const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectItemStyle, className)}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
