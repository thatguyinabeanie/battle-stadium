import Link from "next/link";

import type { organizations } from "@battle-stadium/db/schema";
import { cn } from "@battle-stadium/ui";

import OrganizationLogo from "./organization-logo";

export interface OrgCardProps {
  organization: typeof organizations.$inferSelect;
  disableHover?: boolean;
}

const LOGO_SIZE = 200;

export default function OrganizationCard ({
  organization,
  disableHover,
}: Readonly<OrgCardProps>) {
  return (
    <div className="relative rounded-lg border-none bg-transparent px-2">
      <Link
        prefetch={ true }
        key={ organization.slug }
        href={ `/organizations/${organization.slug}` }
      >
        <div className="flex flex-col overflow-hidden p-2">
          <OrganizationLogo
            priority
            className={ cn("rounded-3xl min-h-28 min-w-28 max-w-40 max-h-40", {
              "hover:scale-105": !disableHover,
              "hover:z-50": !disableHover,
            }) }
            logoSize={ LOGO_SIZE }
            organization={ organization }
            placeholder="blur"
          />
        </div>
      </Link>
    </div>
  );
}
