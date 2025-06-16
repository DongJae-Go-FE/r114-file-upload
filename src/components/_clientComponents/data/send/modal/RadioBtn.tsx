import { InputHTMLAttributes, ReactNode } from "react";

interface RadioBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export default function RadioBtn({ id, children, ...props }: RadioBtnProps) {
  return (
    <label
      htmlFor={id}
      className="flex justify-center items-center body02m w-full h-10 bg-gray-100 cursor-pointer has-checked:bg-gray-900 has-checked:text-white has-checked:cursor-auto hover:bg-gray-200 transition-colors duration-200"
    >
      <input type="radio" id={id} className="sr-only" {...props} />
      <span>{children}</span>
    </label>
  );
}
