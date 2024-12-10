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

interface OrganizationTournamentsLayoutSlots {
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
  slots: Readonly<OrganizationTournamentsLayoutSlots>,
) {
  const { children, header, standings, pairings, metagame, registrations } =
    slots;
  return (
    <>
      <section
        aria-label="Tournament Header"
        className="z-0 m-4 mt-2 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
      >
        {header}
      </section>

      <section
        aria-label="Tournament Content"
        className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Tabs
            className="flex h-full w-full flex-col items-center"
            defaultValue={DEFAULT_TAB}
            aria-label="Tournament Information Tabs"
          >
            <div className="flex w-full flex-col items-center justify-center overflow-auto">
              <TabsList>
                {tabs.map(({ value, title }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    title={title}
                    aria-controls={`${value}-tab`}
                    classNames={{
                      tabsTrigger: "w-[8rem] px-0",
                      badge:
                        "md:text-md text-md w-[8rem] px-1 py-1 h-[2rem] justify-center",
                    }}
                  />
                ))}
              </TabsList>
            </div>

            <Card
              role="tabpanel"
              aria-labelledby="active-tab"
              className="flex h-full w-11/12 flex-col items-center justify-center rounded-none border-0"
            >
              <TabsContent value="details">{children}</TabsContent>
              <TabsContent value="standings">{standings}</TabsContent>
              <TabsContent value="pairings">{pairings}</TabsContent>
              <TabsContent value="metagame">{metagame}</TabsContent>
              <TabsContent value="registrations">{registrations}</TabsContent>
            </Card>
          </Tabs>
        </Suspense>
      </section>
    </>
  );
}
