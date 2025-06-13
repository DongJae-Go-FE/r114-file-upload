import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const TagVariants = cva(
  "inline-flex px-2 h-6 items-center body03m border border-gray-200 text-gray-500",
  {
    variants: {
      isCapsule: {
        default: "rounded-[4px]",
        true: "rounded-full",
      },
      color: {
        white: "bg-white",
        gray: "bg-gray-300",
      },
    },
    defaultVariants: {
      color: "white",
      isCapsule: "default",
    },
  }
);

export interface TagProps
  extends HTMLAttributes<Omit<HTMLSpanElement, "color">>,
    VariantProps<typeof TagVariants> {
  name: string;
  color: "white" | "gray";
}

const Tag = ({ className, color, isCapsule, name, ...props }: TagProps) => {
  return (
    <span
      className={cn(TagVariants({ className, color, isCapsule }))}
      {...props}
    >
      {name}
    </span>
  );
};

export { Tag, TagVariants };
