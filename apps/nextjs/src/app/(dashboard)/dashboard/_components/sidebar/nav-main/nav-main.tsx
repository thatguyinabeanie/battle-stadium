import { Settings2 } from "lucide-react";

import {
  Collapsible,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@battle-stadium/ui";

import type { NavMainItem } from "./components";
import { getMyOrganizations } from "~/app/server-actions/organizations/actions";
import {
  CollapsibleMenuNavItem,
  dashboardNavItem,
  EmptyNavItems,
  navMainItems,
  SidebarMenuButtonCollapsibleTrigger,
  SidebarMenuCollapsibleContent,
} from "./components";

export function NavMain() {
  if (navMainItems.length === 0) {
    return <EmptyNavItems />;
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        <DashboardCollapsibleNavItem />
        <OrganizationsCollapsibleMenuNavItem />

        {navMainItems.map((item) => (
          <CollapsibleMenuNavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

async function OrganizationsCollapsibleMenuNavItem() {
  const { own, member } = await getMyOrganizations();

  const item: NavMainItem = {
    title: "Organizations",
    url: "/dashboard/organizations",
    icon: Settings2,
    isActive: true,
    items: [...own, ...member].map((org) => ({
      title: org.name,
      url: `/dashboard/organizations/${org.slug}`,
    })),
  };
  return (
    <Collapsible
      asChild
      defaultOpen={true}
      className="group/collapsible"
      aria-expanded={true}
      aria-label="Organizations navigation section"
    >
      <SidebarMenuItem>
        <SidebarMenuButtonCollapsibleTrigger item={item} />
        <SidebarMenuCollapsibleContent item={item} />
      </SidebarMenuItem>
    </Collapsible>
  );
}

function DashboardCollapsibleNavItem() {
  return (
    <Collapsible
      asChild
      defaultOpen={true}
      className="group/collapsible"
      aria-expanded={true}
      aria-label="Organizations navigation section"
    >
      <SidebarMenuItem>
        <SidebarMenuButtonCollapsibleTrigger item={dashboardNavItem} />
        <SidebarMenuCollapsibleContent item={dashboardNavItem} />
      </SidebarMenuItem>
    </Collapsible>
  );
}
