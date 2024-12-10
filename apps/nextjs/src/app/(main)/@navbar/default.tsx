import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@battle-stadium/ui";

import NavbarContainer from "~/app/(main)/@navbar/_components/navbar-container";
import RightMenu from "~/app/(main)/@navbar/_components/navbar-right-menu";
import BattleStadium from "~/components/battle-stadium";
import { NavbarItemsConfigs } from "~/lib/config/site";
import NavbarLink from "./_components/navbar-link";

export default function Navbar() {
  return (
    <NavbarContainer
      disableHide
      className="bg-white/95 backdrop-blur-3xl dark:bg-neutral-950"
    >
      <BattleStadium />
      <NavbarLinks />
      <RightMenu />
    </NavbarContainer>
  );
}

function NavbarLinks() {
  return (
    <div className="hidden items-center justify-center md:col-span-3 md:flex">
      {NavbarItemsConfigs.map(({ label, value }) => (
        <NavbarLink
          key={value}
          value={value}
          href={`/${value}`}
          label={label}
        />
      ))}
      <Suspense fallback={null}>
        <DashboardNavLink />
      </Suspense>
    </div>
  );
}

async function DashboardNavLink() {
  const { sessionId } = await auth();
  return (
    <NavbarLink
      value="dashboard"
      key="dashboard"
      href="/dashboard"
      className={cn("items-center", sessionId ? "md:flex" : "hidden")}
      label="Dashboard"
    />
  );
}
