import type { ReactNode } from "react";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  TabsContent as UiTabsContent,
  TabsTrigger as UiTabsTrigger,
} from "@battle-stadium/ui";

import type { TabConfig } from "~/types";
import { Tabs, TabsList } from "~/components/tabs/tabs";

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

      <Tabs
        className="flex h-full w-full flex-col items-center"
        defaultValue={DEFAULT_TAB}
        aria-label="Tournament Information Tabs"
      >
        <div className="flex w-full flex-col items-center overflow-auto">
          <TabsList
            defaultValue={DEFAULT_TAB}
            className="flex w-11/12 flex-row gap-2 overflow-x-visible rounded-none border-x-0 border-b-2"
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
    </div>
  );
}

function TabsTrigger({ value, title }: Readonly<TabConfig>) {
  return (
    <UiTabsTrigger
      key={value}
      value={value}
      title={title}
      className="w-[6rem] py-1 transition-colors data-[state=active]:text-primary lg:w-[7.5rem]"
    >
      <Badge
        variant="secondary"
        className="md:text-md w-[6rem] px-1 py-1 text-sm lg:w-[7.5rem]"
      >
        {title}
      </Badge>
    </UiTabsTrigger>
  );
}

function TabsContent({ value, children }: TabConfig & { children: ReactNode }) {
  return (
    <UiTabsContent
      value={value}
      className="mt-0 flex h-full w-full flex-col items-center justify-center py-0"
    >
      <CardHeader className="capitalize">{value}</CardHeader>
      <CardContent className="min-h-svh">{children}</CardContent>
    </UiTabsContent>
  );
}
