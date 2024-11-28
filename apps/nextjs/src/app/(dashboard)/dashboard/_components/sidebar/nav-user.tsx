import { SignOutButton } from "@clerk/nextjs";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@battle-stadium/ui";

import { DropDownMenuContentMobile } from "./side-bar-client-components";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";

import { Avatar, AvatarFallback, AvatarImage } from "@battle-stadium/ui";

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { SolarUserLinear } from "~/components/svg/icons";

export function NavUserComponent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label="User menu"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <SidebarNavUserDetailsAndAvatarSuspense />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <NavUserDropdownMenuContent />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavUserDropdownMenuContent() {
  return (
    <DropDownMenuContentMobile>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-md">
          <SidebarNavUserDetailsAndAvatarSuspense />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <SignOutButton>
          <div className="flex items-center gap-2">
            <LogOut className="size-4" />
            <span>Log out</span>
          </div>
        </SignOutButton>
      </DropdownMenuItem>
    </DropDownMenuContentMobile>
  );
}

export function SidebarNavUserDetailsAndAvatarSuspense () {
  return (
    <Suspense fallback={ <SidebarNavUserDetailsAndAvatarSkeleton /> }>
      <SidebarNavUserDetailsAndAvatar />
    </Suspense>
  );
}

const DEFAULT_AVATAR = "/images/solar-user-linear.svg";
async function SidebarNavUserDetailsAndAvatar () {
  const me = await getAccountMe();
  const user = await currentUser();
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          className="h-[30px] w-[30px]"
          src={ user?.imageUrl ?? me?.image_url ?? DEFAULT_AVATAR }
          alt={ me?.first_name }
        />

        <AvatarFallback className="rounded-lg">
          <SolarUserLinear className="h-[30px] w-[30px]" />
        </AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-md leading-tight">
        <span className="h-5 min-w-[6rem] max-w-[12rem] truncate font-semibold text-muted-foreground">{ `${me?.first_name} ${me?.last_name}` }</span>
        <span className="h-5 min-w-[4rem] max-w-[10rem] truncate text-sm text-muted-foreground">
          { me?.username }
        </span>
      </div>
    </>
  );
}

function SidebarNavUserDetailsAndAvatarSkeleton () {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <SolarUserLinear className="h-[30px] w-[30px]" />
      </Avatar>

      <div className="grid flex-1 text-left text-md leading-tight">
        <span className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <span className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </>
  );
}
