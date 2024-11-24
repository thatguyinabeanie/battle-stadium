import { Suspense } from "react";

import { generateOrganizationTournamentMatchesStaticParams } from "~/lib/organization-tournaments-static-params";

interface MatchPageProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
    matchId: number;
  }>;
}

export async function generateStaticParams(props: Readonly<MatchPageProps>) {
  const { org_slug, tournament_id } = await props.params;
  const staticParams = await generateOrganizationTournamentMatchesStaticParams(
    org_slug,
    tournament_id,
  );
  return staticParams;
}

export default async function MatchPage(props: Readonly<MatchPageProps>) {
  const { matchId } = await props.params;
  return <div>Match Page { matchId }</div>;
}
