import {
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
  Switch,
} from "@battle-stadium/ui";

import type { SelectOptionItem } from "./shared";
import type { TournamentFormProps } from "./zod-schema";
import { CardWrapper } from "./shared";

const game_options: SelectOptionItem[] = [
  { value: "sv", label: "Scarlet & Violet" },
  { value: "swsh", label: "Sword & Shield" },
  { value: "sm", label: "Sun & Moon" },
];

const format_options: SelectOptionItem[] = [
  { value: "rg", label: "Regulation G" },
  { value: "s1", label: "Series 1" },
];
export function GameInformation({ form }: TournamentFormProps) {
  return (
    <CardWrapper title="Game and Format">
      <FormField
        control={form.control}
        name="game"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Game</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Game..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-black p-3">
                {game_options.map(({ value, label, disabled }) => (
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
        name="format"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Format</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Format..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-black p-3">
                {format_options.map(({ value, label, disabled }) => (
                  <SelectItem key={value} value={value} disabled={disabled}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormDescription>
              Select the format that this tournament will be played on.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="teamSheetRequired"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Team Sheet Required</FormLabel>
              <FormDescription>
                Require participants to submit a team sheet.
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
        name="openTeamSheet"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Team Sheet Required</FormLabel>
              <FormDescription>
                Open team sheet to all participants.
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
