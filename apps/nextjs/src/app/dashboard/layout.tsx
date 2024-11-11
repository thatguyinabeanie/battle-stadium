import { Tabs, TabsContent, TabsList, TabsTrigger } from "@battle-stadium/ui";

import type { DashboardLayoutProps } from "~/types";
import { getAccountMe } from "~/app/server-actions/accounts/actions";

const tabsList = [
  { key: "profiles", title: "Profiles" },
  { key: "pokemon", title: "Pokemon" },
  { key: "tournaments", title: "Tournaments" },
  { key: "dashboard", title: "Dashboard" },
  { key: "settings", title: "Settings" },
];
const adminTab = { key: "admin", title: "Admin" };

export default async function DashboardLayout(
  props: Readonly<DashboardLayoutProps>,
) {
  const me = await getAccountMe();

  const tabsToRender = me?.admin ? [...tabsList, adminTab] : tabsList;

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          {tabsToRender.map(({ key, title }) => (
            <TabsTrigger key={key} value={key}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsToRender.map(({ key }) => (
          <TabsContent key={key} value={key}>
            {renderTabContent(key, props)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function renderTabContent(
  activeTab: string,
  props: Readonly<DashboardLayoutProps>,
) {
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
