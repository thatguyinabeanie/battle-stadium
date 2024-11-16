import { Suspense } from "react";

import { Card, CardContent, CardHeader } from "@battle-stadium/ui";

interface MatchPageProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
}
export default async function MatchPage(props: Readonly<MatchPageProps>) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card>
        <CardHeader>
          Matches for {org_slug} Tournament {tournament_id}{" "}
        </CardHeader>
        <CardContent>
          <p>Matches content</p>
        </CardContent>
      </Card>
    </Suspense>
  );
}
