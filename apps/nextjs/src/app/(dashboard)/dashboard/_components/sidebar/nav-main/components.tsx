import type { LucideIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
    logo?: LucideIcon;
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
      aria-controls={`${item.title.toLowerCase()}-content`}
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

  const hasItems = !!(item.items?.length && item.items.length > 0);

  return (
    <div className="flex flex-row">
      <Link
        href={item.url}
        className="text-md flex flex-row items-center justify-start gap-2 p-2"
      >
        {item.icon ? (
          <item.icon aria-hidden="true" className="text-muted-foreground" />
        ) : null}

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

      {hasItems && (
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="flex items-center"
            tooltip={item.title}
            aria-current={item.isActive ? "page" : undefined}
          >
            <ChevronRight className="ml-auto text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
    <CollapsibleContent id={`${item.title.toLowerCase()}-content`}>
      <SidebarMenuSub>
        {item.items?.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild>
              <Link
                href={subItem.url}
                className="text-sm text-muted-foreground"
              >
                {subItem.logo && (
                  <span>
                    <subItem.logo className="h-4" />
                  </span>
                )}
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
        className="text-md px-2 py-4 text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        No navigation items available
      </div>
    </SidebarGroup>
  );
}
