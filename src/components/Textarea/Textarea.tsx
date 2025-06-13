import { forwardRef, ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 focus-visible:outline-none  focus-visible:border-gray-500 disabled:cursor-not-allowed focus:outline-gray-500 visited:outline-gray-500 focus:outline visited:outline disabled:bg-gray-100 body02m",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
