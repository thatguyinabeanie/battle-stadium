import { Card, CardContent, CardHeader } from "@battle-stadium/ui/card";

interface MatchPageProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
}
export default async function MatchPage (props: Readonly<MatchPageProps>) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;

  return (
    <Card>
      <CardHeader>
        Matches for { org_slug } Tournament { tournament_id }{ " " }
      </CardHeader>
      <CardContent>
        <p>Matches content</p>
      </CardContent>
    </Card>
  );
}
