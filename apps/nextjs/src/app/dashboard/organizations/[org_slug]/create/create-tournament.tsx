"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, useToast } from "@battle-stadium/ui";

import type { OrganizationDashboardPageProps } from "./_components/shared";
import { GameInformation } from "./_components/game-info";
// import { TournamentPhases } from "./_components/phases-info";
import { Registration } from "./_components/registration-info";
import { TournamentInformation } from "./_components/tournament-info";
import { TournamentFormSchema } from "./_components/zod-schema";
import { postTournament } from "~/app/server-actions/tournaments/actions";

export default function CreateTournament({
  org,
}: OrganizationDashboardPageProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof TournamentFormSchema>>({
    resolver: zodResolver(TournamentFormSchema),
    defaultValues: {
      tournamentName: "",
      // phases: [{ name: "Phase 0", bestOf: 3, pairingSystem: "swiss", roundTimer: true, roundTime: 50, matchCheckIn: true, checkInTime: 10 }],
      playerCap: 0,
      startDate: new Date(),
      startTime: "00:00",
      game: "sv",
      format: "rg",
      registrationType: "open",
    },
  });

  async function onSubmit(data: z.infer<typeof TournamentFormSchema>) {
    await postTournament(data, org.slug ?? "");
    
    toast({
      title: "Tournament Created Successfully!",
      description: "Your tournament has been created and saved.",
    });
  }

  return (
    <div className="flex max-h-dvh w-full flex-col items-center space-y-6 p-4">
      <div className="space-y-4 backdrop-filter-none">
        <h1 className="text-3xl font-bold">Create Tournament for {org.name}</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
            <TournamentInformation form={form} />
            <GameInformation form={form} />
            <Registration form={form} />
            {/* <TournamentPhases form={form} /> */}
            <div className="flex justify-end">
            <Button variant="outline" type="submit">Create Tournament</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}