"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";

export function DatePicker({
  initialValue,
  onChangDate,
  id,
  className,
}: {
  initialValue: Date;
  onChangDate: (value: Date) => void;
  id: string;
  className?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(initialValue);

  const handleValue = (value: Date) => {
    setDate(value);
    onChangDate(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          color="white"
          className={cn(
            "w-full justify-start px-4 body02m",
            !date && "text-gray-500",
            className
          )}
        >
          <CalendarIcon className="w-5 h-5" />
          {date ? format(date, "yyyy-MM-dd") : <span>날짜를 선택해주세요.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          id={id}
          mode="single"
          selected={date}
          onSelect={(value) => {
            if (value) handleValue(value);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
