"use client";

import { Input } from "@battle-stadium/ui/input";

import type { Profile } from "~/lib/api";

interface ProfilesAutocompleteProps {
  profiles: Profile[];
}

export default function ProfilesAutocomplete({
  profiles,
}: Readonly<ProfilesAutocompleteProps>) {
  console.log("profiles", profiles);
  return (
    <div>
      <Input type="text" list="profiles" placeholder="Select profile" />
    </div>
  );
}
