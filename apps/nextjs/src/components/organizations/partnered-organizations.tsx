import { Suspense } from "react";

import { getPartneredOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationCard from "./organization-card";

export default function PartneredOrganizationsSuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading organizations...</div>}>
      <PartneredOrganizations />
    </Suspense>
  );
}

async function PartneredOrganizations() {
  'use cache';
  const orgs = await getPartneredOrganizations();

  return (
    <div className="item-center mt-4 flex h-full min-h-40 w-full flex-row justify-center bg-transparent">
      {orgs.map((organization) => (
        <OrganizationCard
          key={organization.slug}
          aria-label={`organization-card-${organization.slug}`}
          organization={organization}
        />
      ))}
    </div>
  );
}
