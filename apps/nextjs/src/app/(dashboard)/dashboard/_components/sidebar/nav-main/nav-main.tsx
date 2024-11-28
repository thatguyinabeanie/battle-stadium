import {
  Building,
  Building2,
  FolderOpen,
  LayoutDashboard,
  Trophy,
  UserRoundPen,
} from "lucide-react";

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
  SidebarMenuButtonCollapsibleTrigger,
  SidebarMenuCollapsibleContent,
} from "./components";

export function NavMain() {
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
    icon: Building2,
    isActive: true,
    items: [...own, ...member].map((org) => ({
      logo: Building,
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
const dashboardNavItem: NavMainItem = {
  title: "Dashboard",
  url: "/dashboard",
  icon: LayoutDashboard,
  isActive: true,
};

const navMainItems: NavMainItem[] = [
  {
    title: "Profiles",
    url: "/dashboard/profiles",
    icon: UserRoundPen,
  },
  {
    title: "Teams",
    url: "#",
    icon: FolderOpen,
  },
  {
    title: "Tournament History",
    url: "/dashboard/tournaments",
    icon: Trophy,
  },
];
