import { currentUser } from "@clerk/nextjs/server";

import { Avatar, AvatarFallback, AvatarImage } from "@battle-stadium/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@battle-stadium/ui/dropdown-menu";

import type { AccountMe } from "~/lib/api";
import UserMenuDropDown from "~/components/navbar/user-menu/user-menu-dropdown";

interface UserMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

async function SmartAvatar() {
  const user = await currentUser();

  if (user?.imageUrl) {
    return (
      <Avatar aria-label="User's profile image" className="bg-transparent">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar aria-label="default profile image" className="bg-transparent" />
  );
}

export default function UserMenu({ ...rest }: Readonly<UserMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SmartAvatar />
      </DropdownMenuTrigger>
      <UserMenuDropDown {...rest} />
    </DropdownMenu>
  );
}
