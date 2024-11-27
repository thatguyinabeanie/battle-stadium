import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  BookOpen,
  Bot,
  ChevronRight,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@battle-stadium/ui";

export function NavMain() {
  if (navMainItems.length === 0) {
    return <EmptyNavItems />;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel aria-label="Platform Navigation">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {navMainItems.map((item) => (
          <CollapsibleMenuNavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface CollapsibleMenuNavItemProps {
  item: NavMainItem;
}

function CollapsibleMenuNavItem({ item }: CollapsibleMenuNavItemProps) {
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
      aria-expanded={item.isActive}
      aria-label={`${item.title} navigation section`}
    >
      <SidebarMenuItem>
        <SidebarMenuButtonCollapsibleTrigger item={item} />
        <SidebarMenuCollapsibleContent item={item} />
      </SidebarMenuItem>
    </Collapsible>
  );
}

function SidebarMenuButtonCollapsibleTrigger({
  item,
}: CollapsibleMenuNavItemProps) {
  return (
    <CollapsibleTrigger asChild>
      <SidebarMenuButton
        tooltip={item.title}
        aria-current={item.isActive ? "page" : undefined}
      >
        {item.icon ? <item.icon aria-hidden="true" /> : null}
        <span>{item.title}</span>
        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
  );
}

function SidebarMenuCollapsibleContent({ item }: CollapsibleMenuNavItemProps) {
  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {item.items?.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild>
              <Link href={subItem.url}>
                <span>{subItem.title}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}

function EmptyNavItems() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel aria-label="Navigation Menu">
        Platform
      </SidebarGroupLabel>
      <div
        className="px-2 py-4 text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        No navigation items available
      </div>
    </SidebarGroup>
  );
}

export const navMainItems: NavMainItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/profiles",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Profiles",
    url: "#",
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
  {
    title: "Organizations",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];
