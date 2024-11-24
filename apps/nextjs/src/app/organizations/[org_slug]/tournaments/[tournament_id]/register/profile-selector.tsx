// components/profile-selector.tsx
"use client";

import type { Profile } from "@battle-stadium/db/schema";
import { Input } from "@battle-stadium/ui";

interface ProfileSelectorProps {
  profiles: Profile[];
}

export function ProfileSelector({ profiles }: ProfileSelectorProps) {
  return (
    <>
      <Input
        type="text"
        name="profile"
        list="profiles"
        placeholder="Select profile"
        required
        aria-label="Select your Profile"
        aria-description="profile-description"
      />

      <div id="profile-description" className="sr-only">
        Select your profile from the list of available profiles
      </div>

      <datalist id="profiles">
        {profiles.map((profile) => (
          <option
            key={profile.id}
            value={profile.username}
            label={profile.username}
            data-profile-id={profile.id}
          />
        ))}
      </datalist>
    </>
  );
}
