"use client";

import { forwardRef, ComponentPropsWithoutRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

/** style */
const checkboxCheckedStyle =
  "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-gray-900";
const checkboxHoverStyle = "hover:border-gray-900";
const checkboxDisabledStyle =
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-200 disabled:bg-gray-100";
const checkboxFocusStyle =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

const checkboxStyle = `peer h-4 w-4 shrink-0 rounded-xs border border-gray-500 ${checkboxHoverStyle} ${checkboxDisabledStyle} ${checkboxFocusStyle} ${checkboxCheckedStyle}`;

const Checkbox = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxStyle, className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.9118 4.25423C11.1396 4.48203 11.1396 4.85138 10.9118 5.07919L6.24516 9.74585C6.01736 9.97366 5.64801 9.97366 5.4202 9.74585L3.08687 7.41252C2.85906 7.18471 2.85906 6.81537 3.08687 6.58756C3.31468 6.35976 3.68402 6.35976 3.91183 6.58756L5.83268 8.50842L10.0869 4.25423C10.3147 4.02642 10.684 4.02642 10.9118 4.25423Z"
          fill="white"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
