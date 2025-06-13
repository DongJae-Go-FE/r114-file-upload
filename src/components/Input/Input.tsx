import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const InputVariants = cva(
  "inline-flex items-center bg-white w-full text-black border-gray-200 disabled:border-gray-200 placeholder:text-gray-500 invalid:outline-none invalid:border-red-500",
  {
    variants: {
      size: {
        xs: "h-8 px-2 py-2.5 body02m rounded-sm",
        sm: "h-8 px-4 py-2.5 body02m rounded-sm",
        md: "h-10 px-4 py-2.5 body02m rounded-md",
        lg: "h-12 px-4 py-3 body01m rounded-lg",
        xl: "h-14 px-4 py-3 body01m rounded-lg",
      },
      variant: {
        default:
          "border focus:outline-gray-500 visited:outline-gray-500 focus:outline visited:outline disabled:bg-gray-100",
        line: "border-b px-0 rounded-none bg-transparent focus:border-gray-500 visited:border-gray-500 focus:outline-none disabled:bg-white",
      },
      align: {
        left: "text-left",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      align: "left",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, align, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputVariants({ size, className, variant, align }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
