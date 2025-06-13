"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";

type DateRangePickerType = {
  className: string;
  id: string;
  disabled?: boolean;
  initialValue: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onChangDate?: (value: DateRange | undefined) => void;
};

export function DateRangePicker({
  className,
  id,
  initialValue,
  onChangDate,
  disabled,
}: DateRangePickerType) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: initialValue?.from,
    to: initialValue?.to,
  });

  const handleValue = (value: DateRange | undefined) => {
    setDate(value);
    if (onChangDate) onChangDate(value);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            color="white"
            disabled={disabled}
            className={cn(
              "w-full justify-start px-4",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-5 h-5" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} -{" "}
                  {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>날짜를 선택해주세요.</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            id={id}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            initialFocus
            onSelect={(value: DateRange | undefined) => {
              handleValue(value);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
