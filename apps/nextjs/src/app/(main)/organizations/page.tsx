import type { Metadata } from "next";
import { memo, Suspense } from "react";

import { getOrSearchOrganizationsAction } from "~/app/server-actions/organizations/actions";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { OrganizationsGrid } from "./_components/client-components";

export const metadata: Metadata = {
  title: "Organizations",
};

const LoadingOrganizations = memo(() => <div>Loading organizations...</div>);

export default function OrganizationsPage() {
  return (
    <>
      <PartneredOrganizations />
      <Suspense fallback={<LoadingOrganizations />}>
        <OrganizationsGrid
          getOrSearchOrganizationsAction={getOrSearchOrganizationsAction}
        />
      </Suspense>
    </>
  );
}
