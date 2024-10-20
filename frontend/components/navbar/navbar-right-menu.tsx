import { NavbarContent, NavbarMenuToggle } from "@/components/nextui-use-client";
import Notifications from "@/components/navbar/notifications";
import Search from "@/components/navbar/search";
import Settings from "@/components/navbar/settings";
import UserMenu from "@/components/navbar/user-menu/user-menu";
import { AccountMe } from "@/lib/api";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

export default async function NavbarRightMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarContent className="gap-0" justify="center">
      <Search />
      <Settings me={me} />
      <Notifications />
      <UserMenu isSignedIn={isSignedIn} me={me} />
      <NavbarMenuToggle className="md:hidden" />
    </NavbarContent>
  );
}
