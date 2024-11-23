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

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import MobileMenu from "~/components/navbar/navbar-mobile-menu";
import {
  SolarMagniferLinear,
  SolarSettingsLinear,
  SolarUserLinear,
} from "../svg/icons";
import UserMenuDropDown from "./user-menu/user-menu-dropdown";
import { Suspense } from "react";

const sharedClassNames =
  "h-[20px] w-[20px] md:h-[24px] md:w-[24px] lg:h-[30px] lg:w-[30px]";

const solarUserLinearClassNames = "h-[24px] w-[24px] md:h-[30px] md:w-[30px] lg:h-[32px] lg:w-[32px]";

export default function RightMenu() {
  return (
    <div className="flex flex-row items-center justify-end">
      <Link passHref href="/search">
        <Button
          aria-label="Search"
          className="flex items-center justify-center bg-transparent p-1"
        >
          <SolarMagniferLinear className={sharedClassNames} />
        </Button>
      </Link>

      <Link prefetch={true} passHref href="/dashboard?tab=settings">
        <Button
          aria-label="Settings"
          className="flex items-center justify-center bg-transparent p-1"
        >
          <SolarSettingsLinear className={sharedClassNames} />
        </Button>
      </Link>

      <Suspense fallback={
        <Avatar aria-label="User's profile image" className="bg-transparent p-1">
          <SolarUserLinear className={ solarUserLinearClassNames } />
        </Avatar>
      }>
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
      <UserMenuDropDown isSignedIn={ !!clerkAuth.userId } me={ me } />
    </DropdownMenu>
  )
}

async function SmartAvatar() {
  const user = await currentUser();

  return (
    <Avatar aria-label="User's profile image" className="bg-transparent p-1">
      <AvatarImage
        src={user?.imageUrl}
        className={
          "h-[24px] w-[24px] md:h-[30px] md:w-[30px] lg:h-[32px] lg:w-[32px]"
        }
      />
      <AvatarFallback>
        <SolarUserLinear className={ solarUserLinearClassNames } />
      </AvatarFallback>
    </Avatar>
  );
}
