import { currentUser } from "@clerk/nextjs/server";

import type { accounts } from "@battle-stadium/db/schema";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@battle-stadium/ui";

import UserMenuDropDown from "~/components/navbar/user-menu/user-menu-dropdown";

interface UserMenuProps {
  me?: typeof accounts.$inferSelect | null;
  isSignedIn: boolean;
}

async function SmartAvatar () {
  const user = await currentUser();

  if (user?.imageUrl) {
    return (
      <Avatar aria-label="User's profile image" className="bg-transparent">
        <AvatarImage src={ user.imageUrl } />
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar aria-label="default profile image" className="bg-transparent" />
  );
}

export default function UserMenu ({ ...rest }: Readonly<UserMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SmartAvatar />
      </DropdownMenuTrigger>
      <UserMenuDropDown { ...rest } />
    </DropdownMenu>
  );
}
