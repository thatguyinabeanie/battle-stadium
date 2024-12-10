import type { Metadata } from "next";

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
      <section
       
        aria-label="Partnered Organization"
        className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950 py-4"
      >
        <PartneredOrganizations />
      </section>

      <section
       
        aria-label="Organizations Index Grid"
        className="scrollbar-gutter-stable z-0 mt-0 w-full overflow-auto rounded-xl border-4 border-neutral-950 bg-neutral-950"
      >
        <OrganizationsGrid
          getOrSearchOrganizationsAction={getOrSearchOrganizationsAction}
        />
      </section>
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
    const query = rawQuery.trim().replace(/[^\w\s-]/g, "");
    if (query) {
      return await searchOrganizations(query);
    }
  }

  return await getOrganizations();
}
