import type { ReactNode } from "react";

import type { Organization } from "@battle-stadium/db/schema";

import OrganizationLogo from "./organization-logo";

interface OrganizationHeaderProps {
  children: ReactNode;
  organization: Organization;
  classNames?: {
    wrapper?: string;
    image?: string;
    childrenWrapper?: string;
  };
}

const HEIGHT_WIDTH = 200;

export default function OrganizationHeader({
  children,
  organization,
  classNames,
}: Readonly<OrganizationHeaderProps>) {
  return (
    <div
      className={`grid h-full w-full grid-cols-2 justify-center py-4 md:grid-cols-3 ${classNames?.wrapper}`}
    >
      <OrganizationLogo
        className={`${classNames?.image}`}
        logoSize={HEIGHT_WIDTH}
        organization={organization}
        priority={true}
      />

      <div
        className={`mx-4 flex h-full flex-col items-center justify-between text-center ${classNames?.childrenWrapper}`}
      >
        {children}
      </div>

      <OrganizationLogo
        className={`hidden md:flex ${classNames?.image}`}
        logoSize={HEIGHT_WIDTH}
        organization={organization}
        priority={true}
      />
    </div>
  );
}
