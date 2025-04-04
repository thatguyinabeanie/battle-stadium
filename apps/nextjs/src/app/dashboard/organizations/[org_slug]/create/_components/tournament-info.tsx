import type { z } from "zod";
import { useFormContext } from "react-hook-form";

import {
  DatePicker,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@battle-stadium/ui";

import type { TournamentFormSchema } from "./zod-schema";
import { CardWrapper } from "./shared";

const selectStartDate = "Select the tournament's start date.";
export function TournamentInformation() {
  const form = useFormContext<z.infer<typeof TournamentFormSchema>>();

  return (
    <CardWrapper title="Tournament Information">
      <FormField
        control={form.control}
        name="tournamentName"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 items-center gap-4">
            <FormLabel className="col-span-1 text-right">Name</FormLabel>
            <div className="col-span-2">
              <FormControl>
                <Input {...field} placeholder="Enter Tournament Name..." />
              </FormControl>
              <FormDescription className="text-sm">
                Official tournament title.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right">Start Date</FormLabel>
            <div className="col-span-2">
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  classNames={{
                    button: "min-w-[250px] justify-start text-left font-normal",
                    calendar: {
                      className: "min-w-[250px] bg-background",
                    },
                  }}
                />
              </FormControl>
              <FormDescription className="text-sm">
                {selectStartDate}
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right">Start Time</FormLabel>
            <div className="col-span-2">
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  id="time"
                  className="w-full rounded border bg-background p-2"
                />
              </FormControl>
              <FormDescription>
                Select the tournament's start time. Participants will be
                notified of this time.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      /> */}
    </CardWrapper>
  );
}
