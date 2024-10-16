import React from "react";

import { getAccountsMe } from "@/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "@/app/server-actions/profiles/actions";
import CreateNewProfile from "@/components/profiles/create-new-profile";
import { ProfilesTable } from "@/components/profiles/profiles-table";
import { Card, Spacer } from "@/components/nextui-use-client";

export default async function Profiles() {
  const me = (await getAccountsMe())?.data;

  if (!me) {
    return null;
  }

  const profiles = (await getProfilesByAccountId(me.id))?.data;

  return (
    <Card
      className="bg-transparent h-90 w-full rounded-3xl backdrop-blur border-small border-neutral-500/40 "
      shadow="md"
    >
      <CreateNewProfile me={me} />
      <Spacer y={4} />
      {profiles && <ProfilesTable profiles={profiles} />}
    </Card>
  );
}
