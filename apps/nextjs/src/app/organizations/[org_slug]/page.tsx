import { Suspense } from "react";
import type { Organization, Tournament } from "@battle-stadium/db/schema";
import {
  getOrganization,
  getOrganizations,
} from "~/app/server-actions/organizations/actions";
import { getSingleOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";
import { SingleOrganizationTournamentsTable } from "~/components/tournaments/single-organization-tournaments-table";

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

async function OrganizationData ({ org_slug }: { org_slug: string }) {
  const { organization, tournaments } = await getSingleOrganizationTournaments(org_slug);

  if (!organization) {
    return <div>404 - Not Found</div>;
  }

  return (
    <OrganizationContent
      organization={ organization }
      tournaments={ tournaments }
    />
  );
}

function OrganizationContent ({
  organization,
  tournaments,
}: {
  organization: Organization;
  tournaments: Tournament[];
}) {
  return (
    <>
      <OrganizationHeader organization={ organization }>
        <div className="mx-4 flex h-full w-full flex-col items-center justify-between py-2 text-center">
          <h1 className="text-2xl font-semibold">{ organization.name }</h1>
          <p>{ organization.description }</p>
        </div>
      </OrganizationHeader>

      <SingleOrganizationTournamentsTable
        className="w-11/12"
        data={ tournaments }
        organization={ organization }
      />
    </>
  );
}

export default async function OrganizationDetailPage (
  props: Readonly<OrganizationDetailPageProps>,
) {
  const { org_slug } = await props.params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <OrganizationData org_slug={ org_slug } />
    </Suspense>
  );
}

export async function generateMetadata (props: Readonly<OrganizationDetailPageProps>) {
  const { org_slug } = await props.params;
  const org = await getOrganization(org_slug).catch(() => null);
  return { title: org?.name ?? "Organization" };
}

export async function generateStaticParams () {
  const orgs = await getOrganizations();
  return orgs.filter((org) => org.slug).map((org) => ({ org_slug: org.slug }));
}
