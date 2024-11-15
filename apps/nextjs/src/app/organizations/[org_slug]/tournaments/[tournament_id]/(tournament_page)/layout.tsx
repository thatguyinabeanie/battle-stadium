"use client";

import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@battle-stadium/ui";

// const tabs = [
//   { key: "details", title: "Details" },
//   { key: "registrations", title: "Registrations" },
//   { key: "pairings", title: "Pairings" },
//   { key: "standings", title: "Standings" },
//   { key: "matches", title: "Matches" },
//   { key: "meta", title: "Metagame" },
// ];

interface OrganizationTournamentsTournamentLayoutProps {
  children: ReactNode;
  standings: ReactNode;
  pairings: ReactNode;
  matches: ReactNode;
  metagame: ReactNode;
  registrations: ReactNode;
  details: ReactNode;
}

export default function OrganizationTournamentsTournamentLayout(
  props: Readonly<OrganizationTournamentsTournamentLayoutProps>,
) {
  const { children, standings, pairings, metagame, registrations, details } =
    props;

  return (
    <div className="flex h-full w-full flex-col items-center">
      {children}

      <div className="flex flex-col items-center py-2" />

      <Tabs>
        <TabsList>
          <TabsTrigger value="standings" title="Standings">
            Standings
          </TabsTrigger>
          <TabsTrigger value="pairings" title="Standings">
            Pairings
          </TabsTrigger>
          {/* <TabsTrigger value="matches" title="Standings">Matches</TabsTrigger> */}
          <TabsTrigger value="metagame" title="Standings">
            Meta Game
          </TabsTrigger>
          <TabsTrigger value="registrations" title="Standings">
            Pairings
          </TabsTrigger>
          <TabsTrigger value="details" title="Standings">
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standings">{standings}</TabsContent>
        <TabsContent value="pairings">{pairings}</TabsContent>
        {/* <TabsContent value="matches">{ matches }</TabsContent> */}
        <TabsContent value="metagame">{metagame}</TabsContent>
        <TabsContent value="registrations">{registrations}</TabsContent>
        <TabsContent value="details">{details}</TabsContent>
      </Tabs>
    </div>
  );
}
