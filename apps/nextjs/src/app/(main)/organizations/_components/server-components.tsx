import { memo } from "react";
import Link from "next/link";

import type { Organization } from "@battle-stadium/db/schema";
import { Card, CardFooter } from "@battle-stadium/ui";

import OrganizationLogo from "~/components/organizations/organization-logo";

export const LoadingOrganizations = memo(() => (
  <div>Loading organizations...</div>
));

export function SimpleOrgCard({ org }: { org: Organization }) {
  return (
    <Link href={`/organizations/${org.slug}`}>
      <Card className="flex aspect-square h-44 flex-col items-center justify-around rounded-xl bg-muted/50 md:h-60">
        <OrganizationLogo
          organization={org}
          logoSize={140}
          className="hover:z-50 hover:scale-105"
        />
        <CardFooter className="text-center text-lg font-bold text-primary hover:z-50 hover:scale-105">
          {org.name}
        </CardFooter>
      </Card>
    </Link>
  );
}
