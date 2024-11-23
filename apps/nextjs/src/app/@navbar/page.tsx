import { auth } from "@clerk/nextjs/server";

import BattleStadium from "~/components/battle-stadium";
import NavbarContainer from "~/components/navbar/navbar-container";
import NavbarLinks from "~/components/navbar/navbar-links";
import RightMenu from "~/components/navbar/navbar-right-menu";

export default async function Navbar() {
  const clerkAuth = await auth();

  return (
    <NavbarContainer
      disableHide
      className="bg-white/95 backdrop-blur-3xl dark:bg-black/95"
    >
      <BattleStadium />
      <NavbarLinks isSignedIn={!!clerkAuth.sessionId} />
      <RightMenu />
    </NavbarContainer>
  );
}
