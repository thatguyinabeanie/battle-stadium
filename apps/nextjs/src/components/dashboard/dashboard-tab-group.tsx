"use client";

import type { Account } from "@battle-stadium/db/schema";
import {
  Tabs as ShadCnUITabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@battle-stadium/ui";

import type { DashboardLayoutProps } from "~/types";

const adminTab = { key: "admin", title: "Admin" };
const tabsList = [
  { key: "account", title: "Account" },
  { key: "profiles", title: "Profiles" },
  { key: "pokemon", title: "Pokemon" },
  { key: "tournaments", title: "Tournaments" },
  { key: "settings", title: "Settings" },
];

interface DashboardProps extends DashboardLayoutProps {
  me?: Account | null;
}

export default function Dashboard (props: Readonly<DashboardProps>) {
  const tabsToRender = props.me?.admin ? [...tabsList, adminTab] : tabsList;

  // TODO: Implement url deep linking of tabs
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <ShadCnUITabs defaultValue="account" className="w-[400px]">
        <TabsList>
          { tabsToRender.map(({ key, title }) => (
            <TabsTrigger key={ key } value={ key }>
              { title }
            </TabsTrigger>
          )) }
        </TabsList>
        { tabsToRender.map(({ key }) => (
          <TabsContent key={ key } value={ key }>
            { renderTabContent(key, props) }
          </TabsContent>
        )) }
      </ShadCnUITabs>
    </div>
  );
}

function renderTabContent (activeTab: string, props: DashboardProps) {
  switch (activeTab) {
    case "profiles":
      return props.profiles;
    case "pokemon":
      return props.pokemon;
    case "tournament_history":
      return props.tournament_history;
    case "dashboard":
      return props.children;
    case "settings":
      return props.settings;
    case "admin":
      return props.admin;
    default:
      return null;
  }
}
