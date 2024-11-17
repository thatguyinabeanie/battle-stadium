import { Card, CardContent, CardHeader } from "@battle-stadium/ui/card";

interface MetagameProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
}

export default async function Metagame (props: Readonly<MetagameProps>) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;

  return (
    <Card>
      <CardHeader>
        Metagame for Organization { org_slug } Tournament { tournament_id }
      </CardHeader>
      <CardContent>
        <p>Metagame content</p>
      </CardContent>
    </Card>
  );
}
