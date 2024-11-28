import type { Metadata } from "next";
import { Suspense } from "react";

import type { Organization } from "@battle-stadium/db/schema";
import { Card, CardFooter } from "@battle-stadium/ui";

import { getOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationLogo from "~/components/organizations/organization-logo";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <>
      <PartneredOrganizations />
      <Suspense fallback={<div>Loading organizations...</div>}>
        <OrganizationsGridRSC />
      </Suspense>
    </>
  );
}

async function OrganizationsGridRSC() {
  const orgs = await getOrganizations();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {orgs.map((org) => (
          <SimpleOrgCard key={org.id} org={org} />
        ))}
      </div>
    </div>
  );
}

function SimpleOrgCard({ org }: { org: Organization }) {
  return (
    <Card
      key={org.id}
      className="flex aspect-square h-44 flex-col items-center justify-around rounded-xl bg-muted/50 md:h-60"
    >
      <OrganizationLogo organization={org} logoSize={140} />
      <CardFooter className="text-center text-lg font-bold">
        {org.name}
      </CardFooter>
    </Card>
  );
}
