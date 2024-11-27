import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@battle-stadium/ui";

import { NavbarItemsConfigs } from "~/lib/config/site";
import NavbarLink from "./navbar-link";

export default function NavbarLinks() {
  return (
    <div className="hidden items-center justify-center md:flex">
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
      className={ cn("flex", { "hidden": !sessionId})}
      label="Dashboard"
    />
  );
}
