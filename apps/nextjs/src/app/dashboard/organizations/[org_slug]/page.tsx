import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";

import { db } from "@battle-stadium/db";
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

import type { OrganizationSlugProps } from "~/types";
import { getOrganizationBySlug } from "~/app/server-actions/organizations/actions";

interface OrganizationDashboardPageParams {
  params: Promise<OrganizationSlugProps>;
}

export async function generateStaticParams() {
  return (
    await db.query.organizations.findMany({
      where: (org, { isNotNull }) => isNotNull(org.slug),
    })
  ).map(({ slug: org_slug }) => ({ org_slug }));
}

export default async function OrganizationDashboardPage(
  props: OrganizationDashboardPageParams,
) {
  const { org_slug } = await props.params;
  return <OrgDashboardContent org_slug={org_slug} />;
}

async function OrgDashboardContent({ org_slug }: OrganizationSlugProps) {
  const org = await getOrganizationBySlug(org_slug);
  if (!org) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Organization Header */}
      <div className="grid grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl font-bold">{org.name}</h1>
          <p className="text-muted-foreground">Organization Dashboard</p>
        </div>

        <div className="flex justify-end">
          <Link
            aria-label="Create new tournament"
            prefetch
            href={`/dashboard/organizations/${org.slug}/create`}
            className="flex flex-row items-center text-right transition-colors hover:text-primary"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Create Tournament
          </Link>
        </div>
      </div>

      {/* Main Content */}
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
                {/* Placeholder for tournament cards */}
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">
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
