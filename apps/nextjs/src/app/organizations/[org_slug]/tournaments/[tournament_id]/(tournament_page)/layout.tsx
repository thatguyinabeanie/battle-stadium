"use client";

import type {ReactNode} from "react";

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

// function renderTabContent(activeTab: string, props: Readonly<OrganizationTournamentsTournamentLayoutProps>) {
//   switch (activeTab) {
//     case "details":
//       return props.details;
//     case "registrations":
//       return props.registrations;
//     case "pairings":
//       return props.pairings;
//     case "standings":
//       return props.standings;
//     case "matches":
//       return props.matches;
//     case "meta":
//       return props.metagame;
//     default:
//       return null;
//   }
// }

export default function OrganizationTournamentsTournamentLayout(
  props: Readonly<OrganizationTournamentsTournamentLayoutProps>,
) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      {props.children}

      <div className="py-2" />

      {/* <Tabs renderTabContent={renderTabContent} tabContents={props} tabs={tabs} /> */}
    </div>
  );
}
