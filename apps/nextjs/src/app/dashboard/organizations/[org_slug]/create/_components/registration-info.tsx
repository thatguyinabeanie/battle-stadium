import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@battle-stadium/ui";

import type { SelectOptionItem } from "./shared";
import type { TournamentFormProps } from "./zod-schema";
import { CardWrapper } from "./shared";

const registration_types: SelectOptionItem[] = [
  { value: "open", label: "Open Registration" },
  { value: "entry-code", label: "Entry Code (Coming Soon)", disabled: true },
  {
    value: "single-use-code",
    label: "Single Use Code (Coming Soon)",
    disabled: true,
  },
  { value: "invite", label: "Invite Only (Coming Soon)", disabled: true },
];
export function Registration({ form }: TournamentFormProps) {
  return (
    <CardWrapper title="Registration">
      <FormField
        control={form.control}
        name="registrationType"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right">Type</FormLabel>
            <div className="col-span-2">
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Registration Type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background p-3">
                  {registration_types.map(({ value, label, disabled }) => (
                    <SelectItem key={value} value={value} disabled={disabled}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                Select the game that this tournament will be played on.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="playerCap"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right">Player Cap</FormLabel>

            <div className="col-span-2">
              <FormControl>
                <Input placeholder="Player Cap..." {...field} />
              </FormControl>
              <FormDescription>
                Set a maximum number of players that can register for this
                tournament
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requireCheckIn"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right text-base">
              Require Check In
            </FormLabel>

            <div className="col-span-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Require participants to check in before the tournament starts.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lateRegistration"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right text-base">
              Late Registration
            </FormLabel>

            <div className="col-span-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormDescription>
                Allow participants to register after the tournament starts.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lateTeamSheet"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right text-base">
              Late Team Sheet Submission
            </FormLabel>
            <div className="col-span-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormDescription>
                Allow participants to submit a team sheet after the tournament
                starts.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lateCheckIn"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right text-base">
              Late Check In{" "}
            </FormLabel>

            <div className="col-span-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormDescription>
                Allow participants to check in after the tournament starts.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </CardWrapper>
  );
}
