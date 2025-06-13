import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const EmptyVariants = cva(
  "flex flex-col items-center justify-center py-2 text-gray-500",
  {
    variants: {
      size: {
        md: "body02m gap-y-1",
        lg: "body01m gap-y-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface EmptyProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof EmptyVariants> {
  description: string;
  isIcon?: boolean;
  icon?: ReactElement;
}

const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, isIcon, icon, description, size, ...props }, ref) => {
    const fillColor = "#999999";

    return (
      <div
        className={cn(EmptyVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {isIcon &&
          (icon ? (
            icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              className={`${size === "lg" ? "w-6 h-6" : "w-[17px] h-[17px]"}`}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.3139 3.31488C4.64024 1.98853 6.47449 1.16699 8.49935 1.16699C10.5242 1.16699 12.3585 1.98853 13.6848 3.31488C15.0111 4.64122 15.8327 6.47547 15.8327 8.50033C15.8327 10.5252 15.0111 12.3594 13.6848 13.6858C12.3585 15.0121 10.5242 15.8337 8.49935 15.8337C6.47449 15.8337 4.64024 15.0121 3.3139 13.6858C1.98756 12.3594 1.16602 10.5252 1.16602 8.50033C1.16602 6.47547 1.98756 4.64122 3.3139 3.31488ZM8.49935 2.50033C6.84231 2.50033 5.34322 3.17117 4.25671 4.25768C3.17019 5.3442 2.49935 6.84329 2.49935 8.50033C2.49935 10.1574 3.17019 11.6564 4.25671 12.743C5.34322 13.8295 6.84231 14.5003 8.49935 14.5003C10.1564 14.5003 11.6555 13.8295 12.742 12.743C13.8285 11.6564 14.4993 10.1574 14.4993 8.50033C14.4993 6.84329 13.8285 5.3442 12.742 4.25768C11.6555 3.17117 10.1564 2.50033 8.49935 2.50033Z"
                fill={fillColor}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.49935 12.8337C8.95959 12.8337 9.33268 12.4606 9.33268 12.0003C9.33268 11.5401 8.95959 11.167 8.49935 11.167C8.03911 11.167 7.66602 11.5401 7.66602 12.0003C7.66602 12.4606 8.03911 12.8337 8.49935 12.8337Z"
                fill={fillColor}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.50065 3.83301C8.86884 3.83301 9.16732 4.13148 9.16732 4.49967V9.83301C9.16732 10.2012 8.86884 10.4997 8.50065 10.4997C8.13246 10.4997 7.83398 10.2012 7.83398 9.83301L7.83398 4.49967C7.83398 4.13148 8.13246 3.83301 8.50065 3.83301Z"
                fill={fillColor}
              />
            </svg>
          ))}
        {description}
      </div>
    );
  }
);
Empty.displayName = "Empty";

export { Empty, EmptyVariants };
