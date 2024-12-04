"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const MAX_DATE = new Date();
export const MIN_DATE = new Date("1900-01-01");

interface DatePickerProps {
  date: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  disabled?: boolean;
}

// TODO: make popover content background not transparent

export function DatePicker({ date, setDate, disabled }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Select date"
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          autoFocus
          mode="single"
          selected={date}
          onSelect={setDate}
          hidden={{ before: MIN_DATE, after: MAX_DATE }}
        />
      </PopoverContent>
    </Popover>
  );
}
