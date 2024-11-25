import NavbarContainer from "~/app/(main)/@navbar/_navbar-components/navbar-container";
import NavbarLinks from "~/app/(main)/@navbar/_navbar-components/navbar-links";
import RightMenu from "~/app/(main)/@navbar/_navbar-components/navbar-right-menu";
import BattleStadium from "~/components/battle-stadium";

export default function Navbar() {
  return (
    <NavbarContainer
      disableHide
      className="bg-white/95 backdrop-blur-3xl dark:bg-black/95"
    >
      <BattleStadium />
      <NavbarLinks />
      <RightMenu />
    </NavbarContainer>
  );
}
