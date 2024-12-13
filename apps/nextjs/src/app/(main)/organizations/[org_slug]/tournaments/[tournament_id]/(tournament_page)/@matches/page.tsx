import { Suspense } from "react";

import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";
import { ErrorBoundary } from "~/components/error-boundary";


export async function generateStaticParams() {
  return (await getOrganizationTournamentsRaw()).map(
    ({ tournaments, organizations }) => ({
      org_slug: organizations?.slug,
      tournament_id: tournaments.id.toString(),
    }),
  );
}

export default async function MatchPage({
  params,
}: Readonly<OrganizationTournamentParams>) {
  const { org_slug, tournament_id } = await params;

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <>
          <h1>Matches content</h1>
          <p>{org_slug}</p>
          <p>{tournament_id}</p>
        </>
      </Suspense>
    </ErrorBoundary>
  );
}
