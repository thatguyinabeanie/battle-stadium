"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import type { Profile } from "@battle-stadium/db/schema";
import { Button, Input } from "@battle-stadium/ui";

import type { PostTournamentRegistrationResponse } from "~/app/server-actions/tournaments/actions";

interface TournamentRegistrationProps {
  org_slug: string;
  tournament_id: number;
  profiles: Profile[];
  tournamentRegistrationAction: (
    formData: FormData,
  ) => Promise<PostTournamentRegistrationResponse | undefined>;
}

export default function TournamentRegistration({
  org_slug,
  tournament_id,
  profiles,
  tournamentRegistrationAction,
}: Readonly<TournamentRegistrationProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerForTournament = async (formData: FormData) => {
    setLoading(true);
    try {
      await tournamentRegistrationAction(formData);
      toast.success("Registration successful!");
      setLoading(false);
      router.back();
    } catch (error: unknown) {
      toast.error(`Registration failed. Please try again. ${error as Error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
      <div>
        Register for {org_slug} tournament {tournament_id}
      </div>

      <form action={registerForTournament} className="grid grid-cols-1 gap-4">
        <Input name="ign" />

        <ProfilesAutocomplete profiles={profiles} />

        <Button
          aria-label="Submit"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

interface ProfilesAutocompleteProps {
  profiles: Profile[];
}

function ProfilesAutocomplete({
  profiles,
}: Readonly<ProfilesAutocompleteProps>) {
  return (
    <div>
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
