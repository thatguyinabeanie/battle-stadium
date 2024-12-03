import { Suspense } from "react";

import { getAllOrgTourMatches } from "~/app/server-actions/organizations/tournaments/matches/actions";

interface MatchPageProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
    match_id: number;
  }>;
}

export async function generateStaticParams() {
  return (await getAllOrgTourMatches()).map(
    ({ matches, tournaments, organizations }) => ({
      org_slug: organizations?.slug,
      tournament_id: tournaments?.id.toString(),
      match_id: matches.id.toString(),
    }),
  );
}

export default function MatchPage(props: Readonly<MatchPageProps>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MatchPageAsync {...props} />
    </Suspense>
  );
}

async function MatchPageAsync(props: Readonly<MatchPageProps>) {
  const { match_id } = await props.params;
  // return <ChatComponent channelName={"ChatChannel"} roomName={matchId} websocketUrl={websocketUrl()} />;
  return (
    <MatchPageContent match_id={match_id} />
  )
}

function MatchPageContent ({ match_id }: { match_id: number }) {
  return <div>Match: { match_id }</div>;
}