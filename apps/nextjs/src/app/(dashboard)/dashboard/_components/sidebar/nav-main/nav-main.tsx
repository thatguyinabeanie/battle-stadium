import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import {
  Building,
  Building2,
  FolderOpen,
  LayoutDashboard,
  Trophy,
  UserRoundPen,
} from "lucide-react";

import { SidebarGroup, SidebarMenu } from "@battle-stadium/ui";

import type { NavMainItem } from "./components";
import { getUserOrganizations } from "~/app/server-actions/organizations/actions";
import { CollapsibleMenuNavItem } from "./components";
import { getVercelOidcToken } from "@vercel/functions/oidc";
import { Tokens } from "~/types";

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

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <CollapsibleMenuNavItem item={dashboardNavItem} />

        <Suspense fallback={<OrganizationsCollapsibleMenuNavItemSkeleton />}>
          <OrganizationsCollapsibleMenuNavItem />
        </Suspense>

        {navMainItems.map((item) => (
          <CollapsibleMenuNavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

async function OrganizationsCollapsibleMenuNavItem() {
  const session = await auth();
  if (!session.userId) {return null;
  }
  const tokens: Tokens = {
    clerk: await session.getToken(),
    oidc: await getVercelOidcToken(),
  }
  const { own, member } = await getUserOrganizations(session.userId, tokens);

  const item: NavMainItem = {
    title: "Organizations",
    url: "/dashboard/organizations",
    icon: Building2,
    isActive: false,
    items: [...own, ...member].map((org) => ({
      logo: Building,
      title: org.name,
      url: `/dashboard/organizations/${org.slug}`,
    })),
  };
  return <CollapsibleMenuNavItem item={item} />;
}

function OrganizationsCollapsibleMenuNavItemSkeleton() {
  const item: NavMainItem = {
    title: "Organizations",
    url: "/dashboard/organizations",
    icon: Building2,
    isActive: true,
    items: [],
  };
  return <CollapsibleMenuNavItem item={item} />;
}
