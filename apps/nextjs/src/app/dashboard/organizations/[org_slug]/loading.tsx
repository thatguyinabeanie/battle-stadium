import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@battle-stadium/ui";

export default function OrgDashboardContentSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Organization Header */}
      <div className="grid grid-cols-2 items-center justify-between">
        <div>
          <div className="text-3xl font-bold"> 
            <div className="w-3/4 h-9 bg-neutral-900 animate-pulse rounded-xl"/>
          </div>
          <p className="text-muted-foreground">Organization Dashboard</p>
        </div>

        <div className="flex justify-end">
          <div className="flex flex-row text-right">
            <Trophy className="mr-2 h-4 w-4" />
            Create Tournament
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger disabled value="active">
            Active Tournaments
          </TabsTrigger>
          <TabsTrigger disabled value="upcoming">
            Upcoming
          </TabsTrigger>
          <TabsTrigger disabled value="past">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Tournaments</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder for tournament cards */}
                <Card className="p-4">
                  <p className="animate-pulse text-sm text-muted-foreground">
                    No active tournaments
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">
                    No upcoming tournaments scheduled
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">
                    No past tournaments found
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
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
