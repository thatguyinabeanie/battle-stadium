import type { ReactNode } from "react";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  TabsList,
  TabsContent as UiTabsContent,
  TabsTrigger as UiTabsTrigger,
} from "@battle-stadium/ui";

interface OrganizationTournamentsTournamentLayoutProps {
  children: ReactNode;
  standings: ReactNode;
  pairings: ReactNode;
  metagame: ReactNode;
  registrations: ReactNode;
  header: ReactNode;
}
interface TabConfig {
  value: string;
  title?: string;
}

const tabs: TabConfig[] = [
  { value: "details", title: "Details" },
  { value: "standings", title: "Standings" },
  { value: "pairings", title: "Pairings" },
  { value: "metagame", title: "Meta Game" },
  { value: "registrations", title: "Registrations" },
];

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
        defaultValue="details"
      >
        <div className="flex w-full flex-col items-center overflow-auto">
          <TabsList
            key="tabslist"
            defaultValue="details"
            className="flex w-11/12 flex-row gap-2 overflow-x-visible rounded-none border-x-0 border-y-2"
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
      className="px- w-[6rem] py-1 lg:w-[7.5rem]"
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
      key={value}
      value={value}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <CardHeader className="capitalize">{value}</CardHeader>
      <CardContent className="min-h-svh">{children}</CardContent>
    </UiTabsContent>
  );
}
