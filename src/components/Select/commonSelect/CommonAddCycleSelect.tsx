"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectLabel,
} from "../Select";

interface CommonAddCycleSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  isAll?: boolean;
}

export function CommonAddCycleSelect({
  value,
  onChange,
  className,
  placeholder = "선택하세요",
  size = "md",
  label,
  disabled,
  isAll,
}: CommonAddCycleSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger size={size} aria-label="셀렉트 박스" className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectScrollUpButton />
        {isAll && <SelectItem value="0">전체</SelectItem>}
        <SelectItem value="1">반기</SelectItem>
        <SelectItem value="2">분기</SelectItem>
        <SelectItem value="3">수시</SelectItem>
        <SelectItem value="4">연간</SelectItem>
        <SelectItem value="5">월간</SelectItem>
        <SelectItem value="6">주간</SelectItem>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
