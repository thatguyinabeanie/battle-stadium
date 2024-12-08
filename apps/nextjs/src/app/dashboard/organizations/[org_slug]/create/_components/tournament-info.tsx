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

import type { TournamentFormProps } from "./zod-schema";
import { CardWrapper } from "./shared";

export function TournamentInformation({ form }: TournamentFormProps) {
  return (
    <CardWrapper title="Tournament Information">
      <FormField
        control={form.control}
        name="tournament_name"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="col-span-1 text-right">Name</FormLabel>
            <div className="col-span-2">
              <FormControl>
                <Input placeholder="Entre Tournament Name..." {...field} />
              </FormControl>
              <FormDescription>Name of the Tournament</FormDescription>
            </div>

            <FormMessage />
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
                  id="date"
                  date={field.value}
                  setDate={field.onChange}
                  classNames={{
                    calendar: {
                      className: "w-[250px]",
                    },
                  }}
                />
              </FormControl>
              <FormDescription>
                Select the tournament's start date. Participants will be notified of this date.  
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

    <FormField
      control={form.control}
      name="startTime"
      render={({ field }) => (
        <FormItem className="grid grid-cols-3 gap-4">
          <FormLabel className="text-right">Start Time</FormLabel>
          <div className="col-span-2">
            <FormControl>
              <Input
                type="time"
                id="time"
                value={field.value}
                onChange={field.onChange}
                className="w-full border bg-background rounded p-2"
              />
            </FormControl>
            <FormDescription>
              Select the tournament's start time. Participants will be notified of this time.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
    </CardWrapper>
  );
}
