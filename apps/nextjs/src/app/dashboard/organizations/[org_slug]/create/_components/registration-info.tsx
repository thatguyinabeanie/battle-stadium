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
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Registration Type..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-black p-3">
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
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="playerCap"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Player Cap</FormLabel>
              <FormDescription>
                Set a maximum number of players that can register for this
                tournament.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="playerCap"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Player Cap</FormLabel>
              <FormDescription>Enable Player Cap.</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxPlayers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Max Players..." {...field} />
            </FormControl>
            <FormDescription>
              Set a maximum number of players that can register for this
              tournament
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requireCheckIn"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Require Check In</FormLabel>
              <FormDescription>
                Require participants to check in before the tournament starts.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lateRegistration"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Late Registration</FormLabel>
              <FormDescription>
                Allow participants to register after the tournament starts.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lateTeamSheet"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Late Team Sheet Submission
              </FormLabel>
              <FormDescription>
                Allow participants to submit a team sheet after the tournament
                starts.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lateCheckIn"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Late Check in</FormLabel>
              <FormDescription>
                Allow participants to check in after the tournament starts.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </CardWrapper>
  );
}
