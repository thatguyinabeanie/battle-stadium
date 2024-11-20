import * as React from "react";

import { getPartneredOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationCard from "./organization-card";

export default async function PartneredOrganizations () {
  const orgs = await getPartneredOrganizations();

  return (
    <div className="mt-4 flex h-full w-full min-h-40 flex-row  flex-start bg-transparent overflow-x-scroll">
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
