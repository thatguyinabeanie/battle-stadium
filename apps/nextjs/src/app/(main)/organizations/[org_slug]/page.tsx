'use cache'

import { cache, Suspense } from "react";
import { notFound } from "next/navigation";

import { SingleOrgTournamentsTable } from "~/app/(main)/organizations/[org_slug]/_components/tournaments-table";
import { getOrganizations } from "~/app/server-actions/organizations/actions";
import { getSingleOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (await getOrganizations()).map((org) => ({ org_slug: org.slug }));
}

const getOrganizationData = cache(async (slug: string) => {
  "use server";
  const data = await getSingleOrganizationTournaments(slug);

  if (!data.organization) {
    notFound();
  }

  return data;
});

export default async function OrganizationDetailPage({
  params,
}: OrganizationDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <OrganizationDetails params={params} />
    </Suspense>
  );
}

async function OrganizationDetails({ params }: OrganizationDetailPageProps) {
  const { org_slug } = await params;
  const { organization, tournaments } = await getOrganizationData(org_slug);

  if (!organization) {
    notFound();
  }

  return (
    <>
      <OrganizationHeader
        organization={ organization }
        classNames={ { wrapper: "my-8" } }
      >
        <div className="mx-4 flex h-full w-full flex-col items-center justify-between py-2 text-center">
          <h1 className="text-2xl font-semibold">{ organization.name }</h1>
          <p>{ organization.description }</p>
        </div>
      </OrganizationHeader>

      <SingleOrgTournamentsTable
        className="w-full px-4"
        data={ tournaments }
        organization={ organization }
      />
    </>
  );
}
