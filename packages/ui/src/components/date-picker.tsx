"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import type { CalendarProps } from "./calendar";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const MAX_DATE = new Date();
export const MIN_DATE = new Date("1900-01-01");

interface DatePickerProps {
  id?: string;
  date: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  disabled?: boolean;
  classNames?: {
    wrapper?: string;
    popover?: string;
    popoverTrigger?: string;
    button?: string;
    popoverContent?: string;
    calendar?: {
      className?: CalendarProps["className"];
      classNames?: CalendarProps["classNames"];
    };
  };
}

export function DatePicker({
  date,
  setDate,
  disabled,
  id,
  classNames,
}: DatePickerProps) {
  return (
    <div id={id} className={classNames?.wrapper}>
      <Popover>
        <PopoverTrigger asChild className={classNames?.popoverTrigger}>
          <Button
            aria-label="Select date"
            variant={"outline"}
            className={cn(
              "min-w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              classNames?.button,
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto bg-popover p-0", classNames?.popoverContent)}
        >
          <Calendar
            autoFocus
            mode="single"
            selected={date}
            onSelect={setDate}
            className={classNames?.calendar?.className}
            classNames={classNames?.calendar?.classNames}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
