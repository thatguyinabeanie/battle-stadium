"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button, useToast } from "@battle-stadium/ui";

import type { OrganizationDashboardPageProps } from "./_components/shared";
import { postTournament } from "~/app/server-actions/tournaments/actions";
import { GameInformation } from "./_components/game-info";
import { Registration } from "./_components/registration-info";
import { TournamentInformation } from "./_components/tournament-info";
import { TournamentFormSchema } from "./_components/zod-schema";

export default function CreateTournament({
  org,
  games,
}: OrganizationDashboardPageProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof TournamentFormSchema>>({
    resolver: zodResolver(TournamentFormSchema),
    defaultValues: {
      tournamentName: "",
      playerCap: false,
      maxPlayers: 4,
      startDate: new Date(),
      // startTime: "05:00 PM",
      game_id: 1,
      format_id: 8,
      registrationType: "open",
      requireCheckIn: true,
      lateRegistration: true,
      lateTeamSheet: true,
      lateCheckIn: true,
      openTeamSheet: true,
      teamSheetRequired: true,
    },
  });

  async function onSubmit(data: z.infer<typeof TournamentFormSchema>) {
    await postTournament(data, org.slug ?? "");
    toast({
      title: "Tournament Created Successfully!",
      description: "Your tournament has been created and saved.",
    });
    // TODO: Redirect after creation succeeded
  }

  return (
    <div className="flex max-h-dvh w-full flex-col items-center space-y-6 p-4">
      <div className="space-y-4 backdrop-filter-none">
        <h1 className="text-3xl font-bold">Create Tournament for {org.name}</h1>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pb-10"
          >
            <TournamentInformation />
            <GameInformation games={games} />
            <Registration />
            {/* <TournamentPhases form={form} /> */}
            <div className="flex justify-end">
              <Button variant="outline" type="submit">
                Create Tournament
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
