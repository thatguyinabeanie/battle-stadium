import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

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

export const navMainItems: NavMainItem[] = [
  {
    title: "Profiles",
    url: "/dashboard/profiles",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Teams",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
];

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

export const dashboardNavItem: NavMainItem = {
  title: "Dashboard",
  url: "/dashboard",
  icon: SquareTerminal,
  isActive: true,
  // items: [
  //   {
  //     title: "History",
  //     url: "#",
  //   },
  // ],
};
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
