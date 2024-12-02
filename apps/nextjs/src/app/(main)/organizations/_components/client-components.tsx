"use client";

import { useEffect, useState } from "react";
import Form from "next/form";
import Link from "next/link";

import type { Organization } from "@battle-stadium/db/schema";
import { Button, Card, CardFooter } from "@battle-stadium/ui";

import { getOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationLogo from "~/components/organizations/organization-logo";

interface OrganizationsGridProps {
  getOrSearchOrganizationsAction: (
    formData?: FormData,
  ) => Promise<Organization[]>;
}

export function OrganizationsGrid({
  getOrSearchOrganizationsAction,
}: OrganizationsGridProps) {
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    async function doThing() {
      const orgs = await getOrganizations();
      setOrgs(orgs);
    }
    void doThing();
  }, [getOrSearchOrganizationsAction]);

  async function getOrSearchOrganizationsActionWrapper(formData?: FormData) {
    const orgs = await getOrSearchOrganizationsAction(formData);
    setOrgs(orgs);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Form className="flex flex-row" action={getOrSearchOrganizationsActionWrapper}>
        <input
          name="query"
          type="text"
          placeholder="Search organizations..."
          className="mb-4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search organizations"
          onChange={(e) => {
            e.preventDefault();
            // Debounce search for better performance
            const form = e.currentTarget.form;
            if (!form) return;
            
            const timeoutId = setTimeout(() => {
              const formData = new FormData(form);
              void getOrSearchOrganizationsActionWrapper(formData);
            }, 300);
            
            return () => clearTimeout(timeoutId);
          }}
        />
        <Button type="submit" className="mb-4 ml-2" aria-label="Submit search">
          Search
        </Button>
      </Form>
      <div className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {orgs.map((org) => (
          <SimpleOrgCard key={org.id} org={org} />
        ))}
      </div>
    </div>
  );
}

export function SimpleOrgCard({ org }: { org: Organization }) {
  return (
    <Link href={`/organizations/${org.slug}`}>
      <Card className="flex aspect-square h-44 flex-col items-center justify-around rounded-xl bg-muted/50 md:h-60">
        <OrganizationLogo
          organization={org}
          logoSize={140}
          className="hover:z-50 hover:scale-105"
        />
        <CardFooter className="text-center text-lg font-bold text-primary hover:z-50 hover:scale-105">
          {org.name}
        </CardFooter>
      </Card>
    </Link>
  );
}
