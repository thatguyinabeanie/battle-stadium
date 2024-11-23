import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Icon } from "@iconify/react/dist/iconify.js";

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
import UserMenuDropDown from "./user-menu/user-menu-dropdown";
import { SolarUserLinear } from "../svg/solar-user-linear";

const sharedClassNames =
  "h-[20px] w-[20px] md:h-[24px] md:w-[24px] lg:h-[30px] lg:w-[30px]";
export default async function RightMenu() {
  const clerkAuth = await auth();
  const me = (await getAccountMe()) ?? undefined;

  return (
    <div className="flex flex-row items-center justify-end ">
      <Button className="p-1 bg-transparent flex items-center justify-center">
        <Icon className={sharedClassNames} icon="solar:magnifer-linear" />
      </Button>

      <Link prefetch={true} passHref href="/dashboard?tab=settings">
        <Button className="p-1 bg-transparent flex items-center justify-center">
          <Icon className={sharedClassNames} icon="solar:settings-linear" />
        </Button>
      </Link>

      <DropdownMenu aria-label="Profile Actions">
        <DropdownMenuTrigger>
          <SmartAvatar />
        </DropdownMenuTrigger>
        <UserMenuDropDown isSignedIn={!!clerkAuth.userId} me={me} />
      </DropdownMenu>

      <MobileMenu />
    </div>
  );
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
        <AvatarFallback>
          <SolarUserLinear className="h-[24px] w-[24px] md:h-[30px] md:w-[30px] lg:h-[32px] lg:w-[32px]" />
        </AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
}
