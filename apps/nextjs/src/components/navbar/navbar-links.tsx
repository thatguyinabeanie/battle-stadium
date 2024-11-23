import { cn } from "@battle-stadium/ui";

import { NavbarItemsConfigs } from "~/lib/config/site";
import NavbarLink from "./navbar-link";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

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
      {/* <DashboardNavLink /> */}
    </div>
  );
}

// async function DashboardNavLink() {
//   const { sessionId } = await auth();
//   return (
//     <Suspense fallback={null}>
//       <NavbarLink
//         value="dashboard"
//         key="dashboard"
//         href="/dashboard"
//         className={ cn("hidden", {
//           "sm:flex": !!sessionId
//         }) }
//         label="Dashboard"
//       />
//     </Suspense>
//   )
// }
