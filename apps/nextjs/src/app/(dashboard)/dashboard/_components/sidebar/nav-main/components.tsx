import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { BookOpen, Bot, ChevronRight, SquareTerminal } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@battle-stadium/ui";

export interface NavMainItem {
  title: string;
  url: `/dashboard${string}` | "#";
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface CollapsibleMenuNavItemProps {
  item: NavMainItem;
}

export function CollapsibleMenuNavItem({ item }: CollapsibleMenuNavItemProps) {
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

export function SidebarMenuButtonCollapsibleTrigger({
  item,
}: CollapsibleMenuNavItemProps) {
  const title = (
    <span className="max-w-[12rem] truncate text-primary">{item.title}</span>
  );

  return (
    <div className="flex flex-row">
      <Link
        href={item.url}
        className="flex flex-row items-center gap-2 p-2 text-sm"
      >
        {item.icon ? <item.icon aria-hidden="true" /> : null}

        {item.title.length < 20 && title}

        {item.title.length >= 20 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{title}</TooltipTrigger>
              <TooltipContent>{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Link>

      {item.items?.length && (
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            aria-current={item.isActive ? "page" : undefined}
          >
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
      )}
    </div>
  );
}

export function SidebarMenuCollapsibleContent({
  item,
}: CollapsibleMenuNavItemProps) {
  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {item.items?.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild>
              <Link href={subItem.url} className="ml-8">
                <span>{subItem.title}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}

export function EmptyNavItems() {
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
