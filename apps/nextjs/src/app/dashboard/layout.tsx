import { Suspense } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent as UITabsContent,
} from "@battle-stadium/ui";

import type { DashboardLayoutProps } from "~/types";
import { getAccountMe } from "~/app/server-actions/accounts/actions";

const tabsList = [
  { key: "dashboard", title: "Dashboard" },
  { key: "profiles", title: "Profiles" },
  { key: "pokemon", title: "Pokemon" },
  { key: "tournaments", title: "Tournaments" },
  { key: "organizations", title: "Organizations" },
  { key: "settings", title: "Settings" },
];
const adminTab = { key: "admin", title: "Admin" };

export default function DashboardLayout(props: Readonly<DashboardLayoutProps>) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-2">
      <Tabs defaultValue="dashboard" className="flex flex-col">
        <TabsList className="flex w-fit flex-row">
          <Suspense fallback={<div>Loading...</div>}>
            <TabsTriggers />
          </Suspense>
        </TabsList>

        <Suspense fallback={<div>Loading...</div>}>
          <TabsContent {...props} />
        </Suspense>
      </Tabs>
    </div>
  );
}

async function TabsContent(props: Readonly<DashboardLayoutProps>) {
  const me = await getAccountMe();
  const tabsToRender = me?.admin ? [...tabsList, adminTab] : tabsList;

  return (
    <>
      {tabsToRender.map(({ key }) => (
        <UITabsContent key={key} value={key}>
          <div className="flex flex-col items-center">
            {renderTabContent(key, props)}
          </div>
        </UITabsContent>
      ))}
    </>
  );
}

async function TabsTriggers() {
  const me = await getAccountMe();
  const tabsToRender = me?.admin ? [...tabsList, adminTab] : tabsList;

  return (
    <>
      {tabsToRender.map(({ key, title }) => (
        <TabsTrigger key={key} value={key}>
          {title}
        </TabsTrigger>
      ))}
    </>
  );
}

function renderTabContent(key: string, props: Readonly<DashboardLayoutProps>) {
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
