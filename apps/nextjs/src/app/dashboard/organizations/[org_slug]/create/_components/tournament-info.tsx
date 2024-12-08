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
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date</FormLabel>
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
              The date the tournament will start.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardWrapper>
  );
}
