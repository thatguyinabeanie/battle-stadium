import { components } from "@/lib/api/openapi-v1";
import { NavbarContent, NavbarMenuToggle } from "@/components/nextui-use-client";
import Search from "@/components/navbar/search";
import Settings from "@/components/navbar/settings";
import UserMenu from "@/components/navbar/user-menu/user-menu";

interface NavbarMobileMenuProps {
  me?: components["schemas"]["AccountMe"];
}

export default async function NavbarRightMenu({ me }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarContent className="gap-0" justify="center">
      <Search />
      <Settings me={me} />
      <UserMenu me={me} />
      <NavbarMenuToggle className="md:hidden" />
    </NavbarContent>
  );
}
