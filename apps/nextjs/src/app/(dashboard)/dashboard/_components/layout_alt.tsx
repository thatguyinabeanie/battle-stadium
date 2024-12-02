import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import { TabsContent as UiTabsContent } from "@battle-stadium/ui";

import type { DashboardLayoutSlots } from "~/types";
import { getAccount } from "~/app/server-actions/accounts/actions";
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs/tabs";

const tabsList = [
  { key: "dashboard", title: "Dashboard" },
  { key: "profiles", title: "Profiles" },
  { key: "pokemon", title: "Pokemon" },
  { key: "tournaments", title: "Tournaments" },
  { key: "organizations", title: "Organizations" },
  { key: "settings", title: "Settings" },
];
const adminTab = { key: "admin", title: "Admin" };

export default function DashboardLayout(slots: Readonly<DashboardLayoutSlots>) {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center pt-2">
      <Suspense fallback={<div>Loading...</div>}>
        <Tabs defaultValue="dashboard" className="flex flex-col items-center">
          <TabsList className="min-w-screen flex flex-row">
            <TabsTriggers />
          </TabsList>
          <TabsContent {...slots} />
        </Tabs>
      </Suspense>
    </div>
  );
}

async function TabsContent(props: Readonly<DashboardLayoutSlots>) {
  const { userId } = await auth();
  const me = await getAccount(userId);
  const tabsToRender = me?.admin ? [...tabsList, adminTab] : tabsList;

  return (
    <>
      {tabsToRender.map(({ key }) => (
        <UiTabsContent key={key} value={key} className="min-w-screen w-full">
          {renderTabContent(key, props)}
        </UiTabsContent>
      ))}
    </>
  );
}

async function TabsTriggers() {
  const { userId } = await auth();
  const me = await getAccount(userId);
  const tabsToRender = me?.admin ? [...tabsList, adminTab] : tabsList;

  return (
    <>
      {tabsToRender.map(({ key, title }) => (
        <TabsTrigger
          key={key}
          value={key}
          title={title}
          aria-label={`Switch to ${title} tab`}
        />
      ))}
    </>
  );
}

function renderTabContent(key: string, props: Readonly<DashboardLayoutSlots>) {
  switch (key) {
    case "profiles":
      return props.profiles;
    case "pokemon":
      return props.pokemon;
    case "tournaments":
      return props.tournament_history;
    case "dashboard":
      return props.children;
    case "settings":
      return props.settings;
    case "admin":
      return props.admin;
    case "organizations":
      return props.organizations;
    default:
      return null;
  }
}
