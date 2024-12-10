import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@battle-stadium/ui";

import NavbarContainer from "~/app/@navbar/_components/navbar-container";
import RightMenu from "~/app/@navbar/_components/navbar-right-menu";
import BattleStadium from "~/components/battle-stadium";
import { NavbarItemsConfigs } from "~/lib/config/site";
import NavbarLink from "./navbar-link";

export default function Navbar() {
  return (
    <NavbarContainer
      disableHide
      className="light:bg-white/95 z-50 p-4 dark:bg-neutral-900"
    >
      <div className="grid w-screen grid-cols-2 items-center rounded-xl px-8 dark:bg-neutral-950 md:grid-cols-5">
        <BattleStadium />
        <NavbarLinks />
        <RightMenu />
      </div>
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
