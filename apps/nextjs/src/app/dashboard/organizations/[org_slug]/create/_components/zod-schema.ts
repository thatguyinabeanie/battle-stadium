import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const PhaseSchema = z.object({
  name: z.string().min(2, {
    message: "Phase name must be at least 2 characters long.",
  }),
  bestOf: z.number().int().min(1, {
    message: "Best of X format must be at least 1 game.",
  }),
  pairingSystem: z.string().min(2, {
    message: "Pairing system must be at least 2 characters long.",
  }),
  roundTimer: z.boolean().default(false),
  roundTime: z.number().int().optional(),
  matchCheckIn: z.boolean().default(false),
  checkInTime: z.number().int().optional(),
  order: z.number().int().optional(),
});

export const TournamentFormSchema = z.object({
  tournamentName: z.string().min(2, {
    message: "Tournament name must be at least 2 characters.",
  }),
  startDate: z.date(),
  startTime: z.string().time(),
  game: z.string().min(2, { message: "Game must be at least 2 characters." }),
  format: z
    .string()
    .min(2, { message: "Format must be at least 2 characters." }),
  teamSheetRequired: z.boolean().default(true),
  openTeamSheet: z.boolean().default(true),
  // phases: z.array(PhaseSchema),
  registrationType: z
    .string()
    .min(2, { message: "Registration type must be at least 2 characters." }),
  playerCap: z.number().int().optional(),
  requireCheckIn: z.boolean().default(true),
  lateRegistration: z.boolean().default(true),
  lateTeamSheet: z.boolean().default(true),
  lateCheckIn: z.boolean().default(true),
});

export interface TournamentFormProps {
  form: UseFormReturn<z.infer<typeof TournamentFormSchema>, unknown, undefined>;
}
