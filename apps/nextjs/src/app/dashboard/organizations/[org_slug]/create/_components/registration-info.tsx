import type { z } from "zod";
import { useFormContext, useWatch } from "react-hook-form";

import {
  Checkbox,
  cn,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@battle-stadium/ui";

import type { SelectOptionItem } from "./shared";
import type { TournamentFormSchema } from "./zod-schema";
import { CardWrapper } from "./shared";

const registration_types: SelectOptionItem<string>[] = [
  { id: "open", label: "Open Registration" },
  { id: "entry-code", label: "Entry Code (Coming Soon)", disabled: true },
  {
    id: "single-use-code",
    label: "Single Use Code (Coming Soon)",
    disabled: true,
  },
  { id: "invite", label: "Invite Only (Coming Soon)", disabled: true },
];

const maxPlayersOptions: SelectOptionItem<number>[] = [
  { id: 4, label: "4 - 3 Swiss Rounds" },
  { id: 8, label: "8 - 4 Swiss Rounds" },
  { id: 16, label: "16 - 5 Swiss Rounds" },
  { id: 32, label: "32 - 6 Swiss Rounds" },
  { id: 64, label: "64 - 7 Swiss Rounds" },
  { id: 128, label: "128 - 8 Swiss Rounds" },
  { id: 256, label: "256 - 9 Swiss Rounds" },
  { id: 512, label: "512 - 10 Swiss Rounds" },
  { id: 1024, label: "1024 - 11 Swiss Rounds" },
  { id: 2048, label: "2048 - 12 Swiss Rounds" },
  { id: 4096, label: "4096 - 13 Swiss Rounds" },
];

export function Registration() {
  const form = useFormContext<z.infer<typeof TournamentFormSchema>>();

  const playerCapWatch = useWatch({ control: form.control, name: "playerCap" });

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
                  {registration_types.map(({ id, label, disabled }) => (
                    <SelectItem key={id} value={id} disabled={disabled}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                Select the registration method for participants.
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
            <FormLabel className="text-right text-base">Player Cap</FormLabel>

            <div className="col-span-2">
              <FormControl>
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Enable a player cap for this tournament.
                  </FormDescription>
                </div>
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxPlayers"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 items-center gap-4">
            <FormLabel
              className={cn("text-right", {
                "text-muted-foreground": !playerCapWatch,
              })}
            >
              Max Player Registrations
            </FormLabel>

            <div className="col-span-2">
              <Select
                disabled={!playerCapWatch}
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn({ "text-muted-foreground": !playerCapWatch })}
                  >
                    <SelectValue placeholder="Enable Player Cap to select max players..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background p-3">
                  {maxPlayersOptions.map(({ id, label }) => (
                    <SelectItem key={id} value={String(id)}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription className="text-sm">
                Select the game that this tournament will be played on.
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
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Require participants to check in before the tournament
                    starts.
                  </FormDescription>
                </div>
              </FormControl>
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
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Allow participants to register after the tournament starts.
                  </FormDescription>
                </div>
              </FormControl>
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
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Allow participants to submit a team sheet after the
                    tournament starts.
                  </FormDescription>
                </div>
              </FormControl>
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
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Allow participants to check in after the tournament starts.
                  </FormDescription>
                </div>
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    </CardWrapper>
  );
}
