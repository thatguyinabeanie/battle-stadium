import React from "react";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Avatar, AvatarFallback, AvatarImage, Button, DropdownMenu, DropdownMenuTrigger } from "@battle-stadium/ui";

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import MobileMenu from "~/components/navbar/navbar-mobile-menu";
import UserMenuDropDown from "./user-menu/user-menu-dropdown";

const sharedClassNames = "h-[20px] w-[20px] md:h-[24px] md:w-[24px] lg:h-[30px] lg:w-[30px]";
export default async function RightMenu () {
  const clerkAuth = await auth();
  const me = (await getAccountMe()) ?? undefined;


  return (
    <div className="flex flex-row items-center justify-center">
      <Button className="p-1">
        <Icon
          className={ sharedClassNames }
          icon="solar:magnifer-linear"
        />
      </Button>

      <Link prefetch={ true } passHref href="/dashboard?tab=settings">
        <Button className="p-1">
          <Icon
            className={ sharedClassNames }
            icon="solar:settings-linear"
          />
        </Button>
      </Link>


      <DropdownMenu>
        <DropdownMenuTrigger>
          <SmartAvatar />
        </DropdownMenuTrigger>
        <UserMenuDropDown isSignedIn={ !!clerkAuth.userId } me={ me } />
      </DropdownMenu>

      <MobileMenu />
    </div>
  );
}

async function SmartAvatar () {
  const user = await currentUser();

  if (user?.imageUrl) {
    return (
      <Avatar
        aria-label="User's profile image"
        className="bg-transparent p-1"
      >
        <AvatarImage src={ user.imageUrl } className={ "h-[24px] w-[24px] md:h-[30px] md:w-[30px] lg:h-[32px] lg:w-[32px]" } />
        <AvatarFallback><div className={ sharedClassNames } />   </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar aria-label="default profile image" className="bg-transparent" />
  );
}
