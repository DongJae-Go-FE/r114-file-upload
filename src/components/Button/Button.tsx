import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const btnDisabledStyle = "disabled:cursor-default disabled:pointer-events-none";

const btnStyle = `inline-flex items-center justify-center gap-2 whitespace-nowrap ${btnDisabledStyle}`;

const buttonVariants = cva(btnStyle, {
  variants: {
    size: {
      xs: "h-6 px-2 rounded-sm body03r",
      sm: "h-8 px-4 rounded-sm body02m",
      md: "h-10 px-6 rounded-md body02m",
      lg: "h-12 px-8 rounded-lg body02m",
      xg: "h-14 px-10 rounded-lg body01b",
      icon: "h-9 w-9",
    },
    color: {
      black: "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-200",
      red: "bg-primary-500 text-white hover:bg-primary-400 disabled:bg-gray-200",
      white:
        "border border-gray-200 bg-white text-black disabled:text-gray-200 hover:bg-gray-100",
    },
    variant: {
      box: "",
      capsule: "rounded-full",
      icon: "px-0 bg-transparent border-none rounded-none hover:bg-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
    variant: "box",
  },
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ size, color, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
