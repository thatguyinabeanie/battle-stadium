import * as React from "react";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@battle-stadium/ui";

import { BattleStadiumLogoLink } from "~/components/battle-stadium";
import { NavbarItemsConfigs } from "~/lib/config/site";
import { DropDownMenuContentMobile } from "./_components/side-bar-client-components";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
        <BattleStadiumLogoLink />
      </div>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                aria-label="Menu with links to main app"
                role="button"
                aria-haspopup="true"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <SimpleBattleStadiumNaming />
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <NavLinksDropDownMenuContentMobile />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}

export function BattleStadiumNaming() {
  return (
    <div
      className="text-md grid flex-1 text-left leading-tight"
      role="presentation"
    >
      <span className="truncate font-semibold text-primary">
        Battle Stadium
      </span>
      <span
        className="truncate text-sm text-muted-foreground"
        aria-label="Company name"
      >
        Beanie LLC
      </span>
    </div>
  );
}

export function SimpleBattleStadiumNaming() {
  return (
    <div
      className="text-md grid flex-1 text-left leading-tight"
      role="presentation"
    >
      <span className="truncate font-semibold text-primary">
        Battle Stadium
      </span>
    </div>
  );
}

function NavLinksDropDownMenuContentMobile() {
  return (
    <DropDownMenuContentMobile>
      <DropdownMenuLabel className="text-sm text-muted-foreground">
        Battle Stadium
      </DropdownMenuLabel>

      {NavbarItemsConfigs.map((navItem, index) => (
        <Link key={navItem.value} href={`/${navItem.value}`}>
          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <navItem.logo className="size-4 shrink-0" />
            </div>
            {navItem.label}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      ))}
    </DropDownMenuContentMobile>
  );
}
