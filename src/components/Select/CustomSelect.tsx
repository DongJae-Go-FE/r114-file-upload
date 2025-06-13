"use client";

import React, { ReactNode } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "./Select";

interface Option {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface CustomSelectProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: ReactNode;
  disabled?: boolean;
  groups?: { label: string; options: Option[] }[];
}

export function CustomSelect({
  options,
  value,
  onChange,
  className,
  placeholder = "선택하세요",
  size = "md",
  label,
  disabled,
  groups,
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger size={size} aria-label="셀렉트 박스" className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectScrollUpButton />
        {groups
          ? groups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map(({ value, label, disabled }) => (
                  <SelectItem key={value} value={value} disabled={disabled}>
                    {label}
                  </SelectItem>
                ))}
                <SelectSeparator />
              </SelectGroup>
            ))
          : options.map(({ value, label, disabled }) => (
              <SelectItem key={value} value={value} disabled={disabled}>
                {label}
              </SelectItem>
            ))}
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
