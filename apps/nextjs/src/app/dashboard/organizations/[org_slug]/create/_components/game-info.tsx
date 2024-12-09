import type { z } from "zod";
import { useFormContext } from "react-hook-form";

import {
  Checkbox,
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

import type { TournamentFormSchema } from "./zod-schema";
import type { getGames } from "~/app/server-actions/games/actions";
import { CardWrapper } from "./shared";

interface GameInformationProps {
  games: Awaited<ReturnType<typeof getGames>>;
}

export function GameInformation({ games }: GameInformationProps) {
  const form = useFormContext<z.infer<typeof TournamentFormSchema>>();

  return (
    <CardWrapper title="Game and Format">
      <FormField
        control={form.control}
        name="game_id"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right">Game</FormLabel>

            <div className="col-span-2">
              <Select
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Game..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background p-3">
                  {games.games.map(({ id, name }) => (
                    <SelectItem key={id} value={String(id)} disabled={false}>
                      {name}
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
        name="format_id"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right">Format</FormLabel>

            <div className="col-span-2">
              <Select
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Format..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background p-3">
                  {games.games_options_with_formats[
                    form.getValues("game_id")
                  ]?.map(({ id, label, disabled }) => (
                    <SelectItem key={id} value={String(id)} disabled={disabled}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                Select the format that this tournament will be played on.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="teamSheetRequired"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right text-base">
              Team Sheet Required
            </FormLabel>
            <div className="col-span-2">
              <FormControl>
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Require players to submit a team sheet.
                  </FormDescription>
                </div>
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="openTeamSheet"
        render={({ field }) => (
          <FormItem className="grid grid-cols-3 gap-4">
            <FormLabel className="text-right text-base">
              Open Team Sheet
            </FormLabel>

            <div className="col-span-2">
              <FormControl>
                <div className="flex flex-row items-center gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormDescription>
                    Open team sheet for all players.
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
