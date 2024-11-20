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
  modal: ReactNode;
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
  const {
    children,
    modal,
    header,
    standings,
    pairings,
    metagame,
    registrations,
  } = props;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {header}
      {modal}
      <Card className="flex h-full w-11/12 flex-col items-center justify-center rounded-none border-x-0 border-b border-t">
        <Tabs
          className="flex h-full w-full flex-col items-center"
          defaultValue="details"
        >
          <TabsList key="tabslist" defaultValue="details" className="py-2">
            {tabs.map(({ value, title }) => (
              <TabsTrigger key={value} value={value} title={title} />
            ))}
          </TabsList>

          <TabsContent value="details">{children}</TabsContent>
          <TabsContent value="standings">{standings}</TabsContent>
          <TabsContent value="pairings">{pairings}</TabsContent>
          <TabsContent value="metagame">{metagame}</TabsContent>
          <TabsContent value="registrations">{registrations}</TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function TabsTrigger({ value, title }: Readonly<TabConfig>) {
  return (
    <UiTabsTrigger key={value} value={value} title={title}>
      <Badge variant="secondary" className="text-md w-[8rem] py-1">
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
