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
  metagame: ReactNode;
  registrations: ReactNode;
  details: ReactNode;
  modal: ReactNode;
}

export default function OrganizationTournamentsTournamentLayout (
  props: Readonly<OrganizationTournamentsTournamentLayoutProps>,
) {
  const { children, standings, pairings, metagame, registrations, details, modal } =
    props;

  return (
    <div key="layout-div" className="flex h-full w-full flex-col items-center">
      { modal }
      { children }

      <div key="spacer" className="flex flex-col items-center py-2" />

      <Tabs key="tabs">
        <TabsList key="tabslist">
          <TabsTrigger key="standings" value="standings" title="Standings">
            Standings
          </TabsTrigger>
          <TabsTrigger key="pairings" value="pairings" title="Standings">
            Pairings
          </TabsTrigger>
          <TabsTrigger key="metagame" value="metagame" title="Standings">
            Meta Game
          </TabsTrigger>
          <TabsTrigger key="registrations" value="registrations" title="Standings">
            Pairings
          </TabsTrigger>
          <TabsTrigger key="details" value="details" title="Standings">
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent key="standings" value="standings">{ standings }</TabsContent>
        <TabsContent key="pairings" value="pairings">{ pairings }</TabsContent>
        <TabsContent key="metagame" value="metagame">{ metagame }</TabsContent>
        <TabsContent key="registrations" value="registrations">{ registrations }</TabsContent>
        <TabsContent key="details" value="details">{ details }</TabsContent>
      </Tabs>
    </div>
  );
}
