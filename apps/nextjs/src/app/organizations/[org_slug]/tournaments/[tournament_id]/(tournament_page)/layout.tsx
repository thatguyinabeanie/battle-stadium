import type { ReactNode } from "react";
import { Suspense } from "react";

import { Card } from "@battle-stadium/ui";

import type { TabConfig } from "~/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/tabs/tabs";

interface OrganizationTournamentsTournamentLayoutProps {
  children: ReactNode;
  standings: ReactNode;
  pairings: ReactNode;
  metagame: ReactNode;
  registrations: ReactNode;
  header: ReactNode;
}

const tabs: TabConfig[] = [
  { value: "details", title: "Details" },
  { value: "standings", title: "Standings" },
  { value: "pairings", title: "Pairings" },
  { value: "metagame", title: "Meta Game" },
  { value: "registrations", title: "Registrations" },
];

const DEFAULT_TAB = "details";

export default function OrganizationTournamentsTournamentLayout(
  props: Readonly<OrganizationTournamentsTournamentLayoutProps>,
) {
  const { children, header, standings, pairings, metagame, registrations } =
    props;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {header}

      <Suspense fallback={<div>Loading...</div>}>
        <Tabs
          className="flex h-full w-full flex-col items-center"
          defaultValue={DEFAULT_TAB}
          aria-label="Tournament Information Tabs"
        >
          <div className="flex w-full flex-col items-center overflow-auto">
            <TabsList
              className="border-x-0 border-t-2"
            >
              {tabs.map(({ value, title }) => (
                <TabsTrigger key={value} value={value} title={title} />
              ))}
            </TabsList>
          </div>

          <Card className="flex h-full w-11/12 flex-col items-center justify-center rounded-none border-0">
            <TabsContent value="details">{children}</TabsContent>
            <TabsContent value="standings">{standings}</TabsContent>
            <TabsContent value="pairings">{pairings}</TabsContent>
            <TabsContent value="metagame">{metagame}</TabsContent>
            <TabsContent value="registrations">{registrations}</TabsContent>
          </Card>
        </Tabs>
      </Suspense>
    </div>
  );
}
