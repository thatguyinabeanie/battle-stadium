import { Suspense } from "react";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@battle-stadium/ui";

import MobileMenu from "~/app/(main)/@navbar/_navbar-components/navbar-mobile-menu";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import {
  SolarMagniferLinear,
  SolarSettingsLinear,
  SolarUserLinear,
} from "~/components/svg/icons";
import UserMenuDropDown from "./user-menu/user-menu-dropdown";

const sharedClassNames = "h-[28px] w-[28px]";

const solarUserLinearClassNames = "h-[30px] w-[30px]";

export default function RightMenu() {
  return (
    <div className="flex flex-row items-center justify-end">
      <SolarMagniferLinear className={sharedClassNames} />

      <Link prefetch={true} passHref href="/dashboard?tab=settings">
        <Button
          aria-label="Settings"
          className="flex items-center justify-center bg-transparent p-1"
        >
          <SolarSettingsLinear className={sharedClassNames} />
        </Button>
      </Link>

      <Suspense
        fallback={
          <Avatar
            aria-label="User's profile image"
            className="bg-transparent p-1"
          >
            <SolarUserLinear className={solarUserLinearClassNames} />
          </Avatar>
        }
      >
        <UserMenu />
      </Suspense>

      <MobileMenu />
    </div>
  );
}

async function UserMenu() {
  const clerkAuth = await auth();
  const me = (await getAccountMe()) ?? undefined;

  return (
    <DropdownMenu aria-label="Profile Actions">
      <DropdownMenuTrigger>
        <SmartAvatar />
      </DropdownMenuTrigger>
      <UserMenuDropDown isSignedIn={!!clerkAuth.userId} me={me} />
    </DropdownMenu>
  );
}

async function SmartAvatar() {
  const user = await currentUser();

  return (
    <Avatar aria-label="User's profile image" className="bg-transparent p-1">
      <AvatarImage src={user?.imageUrl} className={"h-[30px] w-[30px]"} />
      <AvatarFallback>
        <SolarUserLinear className={solarUserLinearClassNames} />
      </AvatarFallback>
    </Avatar>
  );
}
