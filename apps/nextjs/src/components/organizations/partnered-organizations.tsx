import * as React from "react";
import { getPartneredOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationCard from "./organization-card";

export default async function PartneredOrganizations () {
  const orgs = await getPartneredOrganizations();

  return (
    <div className="flex h-full w-full flex-row items-center justify-center bg-transparent">
      { orgs.map((organization) => (
        <OrganizationCard
          key={ organization.slug }
          aria-label={ `organization-card-${organization.slug}` }
          organization={ organization }
        />
      )) }
    </div>
  );
}
