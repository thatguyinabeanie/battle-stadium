import BattleStadium from "~/components/battle-stadium";
import NavbarContainer from "~/components/navbar/navbar-container";
import NavbarLinks from "~/components/navbar/navbar-links";
import RightMenu from "~/components/navbar/navbar-right-menu";

export default function Navbar() {
  return (
    <NavbarContainer
      disableHide
      className="bg-white/95 backdrop-blur-3xl dark:bg-black/95"
    >
      <BattleStadium />
      <NavbarLinks/>
      <RightMenu />
    </NavbarContainer>
  );
}
