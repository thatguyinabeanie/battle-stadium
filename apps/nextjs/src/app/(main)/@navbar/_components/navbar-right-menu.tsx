import Link from "next/link";
import type { User } from "@clerk/nextjs/server";
import { auth, currentUser } from "@clerk/nextjs/server";


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@battle-stadium/ui";

import MobileMenu from "~/app/(main)/@navbar/_components/navbar-mobile-menu";
import {
  SolarMagniferLinear,
  SolarSettingsLinear,
  SolarUserLinear,
} from "~/components/svg/icons";
import UserMenuDropDown from "./user-menu-dropdown";

import { db, eq } from "@battle-stadium/db";
import { accounts, clerkUsers } from "@battle-stadium/db/schema";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";


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

        <UserMenu />

      <MobileMenu />
    </div>
  );
}

async function UserMenu() {

  const { clerkUser, isAdmin, userId } = await getUserData();
  return (
    <DropdownMenu aria-label="Profile Actions">
      <DropdownMenuTrigger>
        <SmartAvatar clerkUser={clerkUser} />
      </DropdownMenuTrigger>
      <UserMenuDropDown
        firstName={ clerkUser?.firstName ?? "" }
        lastName={ clerkUser?.lastName ?? "" }
        isSignedIn={ !!userId }
        isAdmin={ isAdmin } />
    </DropdownMenu>
  );
}

async function getUserData() {
  const session = await auth();

  if (session.userId) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const accountQueryResults = await getAccountQuery(session.userId);
      if (accountQueryResults.length > 0 ) {
        const account = accountQueryResults[0];
        return { clerkUser, isAdmin: account?.accounts.admin ?? false, userId: session.userId };
      }
    }
  }
  return { clerkUser: null, isAdmin: false , userId: null };
}

async function getAccountQuery (userId: string) {
  "use cache";
  cacheTag(`getAccountQuery(${userId})`);
  return db.select({ clerkUsers, accounts })
    .from(accounts)
    .leftJoin(clerkUsers, eq(accounts.id, clerkUsers.accountId))
    .where(eq(clerkUsers.clerkUserId, userId)).limit(1);

}

function SmartAvatar({clerkUser}: {clerkUser?: User | null}) {
  return (
    <Avatar aria-label="User's profile image" className="bg-transparent p-1">
      <AvatarImage src={ clerkUser?.imageUrl} className={"h-[30px] w-[30px]"} />
      <AvatarFallback>
        <SolarUserLinear className={solarUserLinearClassNames} />
      </AvatarFallback>
    </Avatar>
  );
}
