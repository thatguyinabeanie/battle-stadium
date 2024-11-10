import type { ReactNode } from "react";

import type { organizations } from "@battle-stadium/db/schema";

import OrganizationLogo from "./organization-logo";

interface OrganizationHeaderProps {
  children: ReactNode;
  organization: typeof organizations.$inferSelect;
}

const HEIGHT_WIDTH = 175;

export default function OrganizationHeader({
  children,
  organization,
}: Readonly<OrganizationHeaderProps>) {
  return (
    <div className="flex h-full w-full flex-row items-center justify-around py-8">
      <OrganizationLogo logoSize={HEIGHT_WIDTH} organization={organization} />

      <div className="mx-4 flex h-full flex-col items-center justify-between text-center">
        {children}
      </div>

      <OrganizationLogo
        className="hidden sm:flex"
        logoSize={HEIGHT_WIDTH}
        organization={organization}
      />
    </div>
  );
}
