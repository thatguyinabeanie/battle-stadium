import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@battle-stadium/ui";

interface OrganizationTournamentsTournamentLayoutProps {
  children: ReactNode;
  standings: ReactNode;
  pairings: ReactNode;
  metagame: ReactNode;
  registrations: ReactNode;
  details: ReactNode;
  modal: ReactNode;
  header: ReactNode;
}

export default function OrganizationTournamentsTournamentLayout (
  props: Readonly<OrganizationTournamentsTournamentLayoutProps>,
) {
  const {
    children,
    modal,
    header,
  } = props;

  return (
    <div key="layout-div" className="flex h-full w-full flex-col items-center">
      { header }
      { modal }
      { children }
      <OrgTournamentTabs { ...props } />
    </div>
  );
}

function OrgTournamentTabs (props: Readonly<OrganizationTournamentsTournamentLayoutProps>) {
  return (
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
        <TabsTrigger
          key="registrations"
          value="registrations"
          title="Standings"
        >
          Pairings
        </TabsTrigger>
        <TabsTrigger key="details" value="details" title="Standings">
          Details
        </TabsTrigger>
      </TabsList>

      <TabsContent key="standings" value="standings">
        { props.standings }
      </TabsContent>
      <TabsContent key="pairings" value="pairings">
        { props.pairings }
      </TabsContent>
      <TabsContent key="metagame" value="metagame">
        { props.metagame }
      </TabsContent>
      <TabsContent key="registrations" value="registrations">
        { props.registrations }
      </TabsContent>
      <TabsContent key="details" value="details">
        { props.details }
      </TabsContent>
    </Tabs>
  )
}
