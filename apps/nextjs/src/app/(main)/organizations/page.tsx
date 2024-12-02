import type { Metadata } from "next";
import { Suspense } from "react";

import {
  getOrganizations,
  searchOrganizations,
} from "~/app/server-actions/organizations/actions";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { OrganizationsGrid } from "./_components/client-components";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PartneredOrganizations />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <OrganizationsGrid
          getOrSearchOrganizationsAction={getOrSearchOrganizationsAction}
        />
      </Suspense>
    </>
  );
}

export async function getOrSearchOrganizationsAction(formData?: FormData) {
  "use server";
  if (formData) {
    const query = ((formData.get("query") as string | null) ?? "").trim();
    if (query) {
      return await searchOrganizations(query);
    }
  }

  return await getOrganizations();
}
