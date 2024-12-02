"use client";

import type { ChangeEventHandler} from "react";
import { useCallback, useEffect, useState } from "react";
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
    async function fetchInitialOrganizations() {
      const orgs = await getOrganizations();
      setOrgs(orgs);
    }
    void fetchInitialOrganizations();
  }, []);

  const getOrSearchOrganizationsActionWrapper = useCallback(async (formData?: FormData) => {
    const orgs = await getOrSearchOrganizationsAction(formData);
    setOrgs(orgs);
    return orgs;
  }, [getOrSearchOrganizationsAction]);


  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault();
    // Debounce search for better performance
    const form = e.currentTarget.form;
    if (!form) return;

    const timeoutId = setTimeout(() => {
      const formData = new FormData(form);
      void getOrSearchOrganizationsActionWrapper(formData);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [getOrSearchOrganizationsActionWrapper]);

  return (

    <div className="flex flex-1 flex-col gap-4 p-4">
      {orgs.length === 0 ? (
        <OrganizationsGridSkeleton />
      ) : (
        <LoadedOrganizations
          orgs={orgs}
          onInputChange={onInputChange}
          getOrSearchOrganizationsAction={getOrSearchOrganizationsActionWrapper}
        />
      )}
    </div>
  );
}
interface LoadedOrganizationsProps extends OrganizationsGridProps {
  orgs: Organization[];
  onInputChange: ChangeEventHandler<HTMLInputElement>;
}

function LoadedOrganizations ({ orgs, onInputChange, getOrSearchOrganizationsAction  }: LoadedOrganizationsProps) {
  return (
    <>
      <Form className="flex flex-row w-full justify-start" action={ getOrSearchOrganizationsAction }>
        <input
          name="query"
          type="text"
          placeholder="Search organizations..."
          className="mb-4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search organizations"
          onChange={ onInputChange }
        />
        <Button variant="outline" type="submit" className="mb-4 ml-2" aria-label="Submit search">
          Search
        </Button>
      </Form>
      <div className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {orgs.map((org) => (
          <SimpleOrgCard key={org.id} org={org} />
        ))}
      </div>
    </>
  )
}

export function SimpleOrgCard({ org }: { org: Organization }) {
  return (
    <Link
      href={`/organizations/${org.slug}`}
      aria-label={`View ${org.name} organization details`}
    >
      <Card className="flex aspect-square h-52 flex-col items-center justify-around rounded-xl bg-muted/50 md:h-60">
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

function OrganizationsGridSkeleton () {
  return (
    <>
      <div className="flex flex-row w-full justify-start">
        <input
          disabled
          name="query"
          type="text"
          placeholder="Search organizations..."
          className="mb-4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-primary animate-pulse"
        />
        <Button variant="outline" type="submit" className="mb-4 ml-2 animate-pulse" aria-label="Submit search" disabled>
          Search
        </Button>
      </div>
      <div className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        { Array.from({ length: 30 }).map((_, i) => (
          <div key={ i } className=" flex aspect-square h-44 flex-col items-center justify-around rounded-xl bg-muted/50 md:h-60">
            <div className="animate-pulse aspect-square h-28 w-28 bg-gray-300 rounded-2xl" />
            <div className="animate-pulse w-20 h-4 bg-gray-300 rounded" />
          </div>
        )) }
      </div>
    </>
  );
}
