import { Suspense } from "react";

interface MatchPageProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
    matchId: number;
  }>;
}

export default async function MatchPage(props: Readonly<MatchPageProps>) {
  const { matchId } = await props.params;
  // return <ChatComponent channelName={"ChatChannel"} roomName={matchId} websocketUrl={websocketUrl()} />;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Match Page {matchId}</div>
    </Suspense>
  );
}
