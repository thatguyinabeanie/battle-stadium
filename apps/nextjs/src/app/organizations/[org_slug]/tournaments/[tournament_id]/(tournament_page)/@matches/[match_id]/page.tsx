import { Suspense } from "react";

interface MatchPageProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
    matchId: number;
  }>;
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
