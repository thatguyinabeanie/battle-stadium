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
  "use cache";

  const { org_slug, tournament_id } = await props.params;
  const staticParams = await generateOrganizationTournamentMatchesStaticParams(
    org_slug,
    tournament_id,
  );
  return staticParams;
}

export default function MatchPage(props: Readonly<MatchPageProps>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Match {...props} />
    </Suspense>
  );
}

async function Match(props: Readonly<MatchPageProps>) {
  const { matchId } = await props.params;
  // return <ChatComponent channelName={"ChatChannel"} roomName={matchId} websocketUrl={websocketUrl()} />;
  return <div>Match Page {matchId}</div>;
}
