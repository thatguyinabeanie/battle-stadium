"use client";

import type { ChangeEventHandler } from "react";
import { useCallback, useEffect, useState } from "react";
import Form from "next/form";
import Link from "next/link";

import type { Organization } from "@battle-stadium/db/schema";
import { Button, Card, CardFooter, Input } from "@battle-stadium/ui";

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
  const [mounted, setMounted] = useState(false);
  const [orgs, setOrgs] = useState<Organization[] | undefined>(undefined);

  useEffect(() => {
    async function fetchInitialOrganizations() {
      const orgs = await getOrganizations();
      setOrgs(orgs);
      setMounted(true);
    }

    void fetchInitialOrganizations();
  }, []);

  const getOrSearchOrganizationsActionWrapper = useCallback(
    async (formData?: FormData) => {
      const orgs = await getOrSearchOrganizationsAction(formData);
      setOrgs(orgs);
      return orgs;
    },
    [getOrSearchOrganizationsAction],
  );

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      // Debounce search for better performance
      const form = e.currentTarget.form;
      if (!form) return;

      const timeoutId = setTimeout(() => {
        const formData = new FormData(form);
        void getOrSearchOrganizationsActionWrapper(formData);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [getOrSearchOrganizationsActionWrapper],
  );

  return (
    <>
      {!mounted ? (
        <OrganizationsGridSkeleton />
      ) : (
        <LoadedOrganizations
          orgs={orgs}
          onInputChange={onInputChange}
          getOrSearchOrganizationsAction={getOrSearchOrganizationsActionWrapper}
        />
      )}
    </>
  );
}
interface LoadedOrganizationsProps extends OrganizationsGridProps {
  orgs?: Organization[];
  onInputChange: ChangeEventHandler<HTMLInputElement>;
}

function LoadedOrganizations({
  orgs,
  onInputChange,
}: LoadedOrganizationsProps) {
  return (
    <>
      <Form
        className="grid w-full grid-cols-2 justify-end p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        action={""}
      >
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4" />
        <Input
          name="query"
          type="text"
          placeholder="Search organizations..."
          className="mr-4 h-10 rounded border px-2 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search organizations"
          onChange={onInputChange}
        />
      </Form>
      <div className="flex flex-col overflow-y-scroll">
        <div className="grid auto-rows-min grid-cols-2 items-center gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {orgs?.map((org) => <SimpleOrgCard key={org.id} org={org} />)}
        </div>
      </div>
    </>
  );
}

const TRANSITION_CLASSES = "transition-all duration-50 ease-in-out";
const HOVER_CLASSES =
  "hover:z-50 hover:scale-105 hover:border hover:border-primary hover:brightness-110";
const LAYOUT_CLASSES =
  "flex aspect-square h-52 flex-col items-center justify-around rounded-xl md:h-60";
export function SimpleOrgCard({ org }: { org: Organization }) {
  return (
    <Link
      href={`/organizations/${org.slug}`}
      aria-label={`View ${org.name} organization details`}
    >
      <Card
        className={`bg-muted/50 font-medium ${TRANSITION_CLASSES} ${HOVER_CLASSES} ${LAYOUT_CLASSES}`}
      >
        <OrganizationLogo
          organization={org}
          logoSize={140}
          className={TRANSITION_CLASSES}
        />
        <CardFooter
          className={`${TRANSITION_CLASSES} text-center text-lg text-primary`}
        >
          {org.name}
        </CardFooter>
      </Card>
    </Link>
  );
}

export function OrganizationsGridSkeleton() {
  return (
    <>
      <div className="flex w-full flex-row justify-start">
        <input
          disabled
          name="query"
          type="text"
          placeholder="Search organizations..."
          className="mb-4 animate-pulse rounded border p-2 px-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          variant="outline"
          type="submit"
          className="mb-4 ml-2 animate-pulse"
          aria-label="Submit search"
          disabled
        >
          Search
        </Button>
      </div>
      <div className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square h-44 flex-col items-center justify-around rounded-xl bg-muted/50 md:h-60"
          >
            <div className="aspect-square h-28 w-28 animate-pulse rounded-2xl bg-neutral-800" />
            <div className="h-4 w-20 animate-pulse rounded bg-neutral-800" />
          </div>
        ))}
      </div>
    </>
  );
}
