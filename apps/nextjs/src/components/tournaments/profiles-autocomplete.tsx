"use client";

import type { Profile } from "@battle-stadium/db/schema";
import { Input } from "@battle-stadium/ui";

interface ProfilesAutocompleteProps {
  profiles: Profile[];
}

export default function ProfilesAutocomplete({
  profiles,
}: Readonly<ProfilesAutocompleteProps>) {
  return (
    <div>
      <Input
        type="text"
        name="profile"
        list="profiles"
        placeholder="Select profile"
      />

      <div className="pt-4">
        <datalist id="profiles">
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.username} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
