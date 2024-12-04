
import { Button, Tabs, TabsList, TabsTrigger, TabsContent, Card, CardHeader, CardTitle, CardContent } from "@battle-stadium/ui";
import { Trophy } from "lucide-react";

export default function OrgDashboardContentSkeleton ({ org_slug }: { org_slug: string }) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Organization Header */ }
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{ org_slug }</h1>
          <p className="text-muted-foreground">Tournament Organization Dashboard</p>
        </div>
        <Button>
          <Trophy className="mr-2 h-4 w-4" />
          Create Tournament
        </Button>
      </div>

      {/* Main Content */ }
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Tournaments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder for tournament cards */ }
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">
                    No active tournaments
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No upcoming tournaments scheduled
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No past tournaments found
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */ }
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Players</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
