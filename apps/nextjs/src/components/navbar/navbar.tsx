import { auth } from "@clerk/nextjs/server";

import BattleStadium from "~/components/battle-stadium";
import NavbarContainer from "~/components/navbar/navbar-container";
import NavbarLinks from "~/components/navbar/navbar-links";
import MobileMenu from "~/components/navbar/navbar-mobile-menu";
import RightMenu from "~/components/navbar/navbar-right-menu";

export default async function Navbar() {
  const clerkAuth = await auth();

  return (
    <NavbarContainer>
      <nav className="relative flex w-full border-b bg-transparent backdrop-blur-3xl">
        <div className="w-full px-4 backdrop-blur-3xl">
          <div className="flex h-16 w-full items-center justify-between backdrop-blur-3xl">
            <BattleStadium />

            <NavbarLinks isSignedIn={!!clerkAuth.sessionId} />

            <RightMenu />
            <MobileMenu />
          </div>
        </div>
      </nav>
    </NavbarContainer>
  );
}
