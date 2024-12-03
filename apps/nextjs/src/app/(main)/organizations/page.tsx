import type { Metadata } from "next";
import { Suspense } from "react";

import {
  getOrganizations,
  searchOrganizations,
} from "~/app/server-actions/organizations/actions";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import {
  OrganizationsGrid,
  OrganizationsGridSkeleton,
} from "./_components/client-components";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PartneredOrganizations />
      </Suspense>

      <Suspense fallback={<OrganizationsGridSkeleton />}>
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
    const rawQuery = (formData.get("query") as string | null) ?? "";
    if (rawQuery.length > 100) {
      throw new Error("Search query too long");
    }
    const query = rawQuery.trim().replace(/[^\w\s-]/g, '');
    if (query) {
      return await searchOrganizations(query);
    }
  }

  return await getOrganizations();
}
