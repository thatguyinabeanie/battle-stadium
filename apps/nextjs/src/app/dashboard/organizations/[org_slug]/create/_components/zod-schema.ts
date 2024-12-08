import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const PhaseSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bestOf: z.number().int().min(1, { message: "Best of must be at least 1." }),
});

export const TournamentFormSchema = z.object({
  tournament_name: z.string().min(2, {
    message: "Tournament name must be at least 2 characters.",
  }),
  startDate: z.date({ required_error: "Date is required." }),
  game: z.string().min(2, { message: "Game must be at least 2 characters." }),
  format: z
    .string()
    .min(2, { message: "Format must be at least 2 characters." }),
  teamSheetRequired: z.boolean().default(true),
  openTeamSheet: z.boolean().default(true),
  phases: z.array(PhaseSchema),
  registrationType: z
    .string()
    .min(2, { message: "Registration type must be at least 2 characters." }),
  playerCap: z.boolean().default(false),
  maxPlayers: z.number().int().optional(),
  requireCheckIn: z.boolean().default(true),
  lateRegistration: z.boolean().default(true),
  lateTeamSheet: z.boolean().default(true),
  lateCheckIn: z.boolean().default(true),
});

export interface TournamentFormProps {
  form: UseFormReturn<z.infer<typeof TournamentFormSchema>, unknown, undefined>;
}
