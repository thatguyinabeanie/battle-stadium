"use client";
import type { Profile } from "@battle-stadium/db/schema";
import { Button, Input } from "@battle-stadium/ui";
import { useRouter } from 'next/navigation'

import { useState } from "react";
import { toast } from "react-toastify";
import type { PostTournamentRegistrationResponse } from "~/app/server-actions/tournaments/actions";


interface TournamentRegistrationProps {
  org_slug: string;
  tournament_id: number;
  profiles: Profile[];
  tournamentRegistrationAction: (formData: FormData) => Promise<PostTournamentRegistrationResponse | undefined>;
}

export default function TournamentRegistration ({
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
      toast.error(`Registration failed. Please try again. ${error}`);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
      <div>
        Register for { org_slug } tournament { tournament_id }
      </div>

      <form action={ registerForTournament } className="grid grid-cols-1 gap-4">
        <Input name="ign" />

        <ProfilesAutocomplete profiles={ profiles } />

        <Button aria-label="Submit" color="primary" type="submit" disabled={ loading }>
          { loading ? "Submitting..." : "Submit" }
        </Button>
      </form>
    </div>
  );
}

interface ProfilesAutocompleteProps {
  profiles: Profile[];
}

function ProfilesAutocomplete ({
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
          { profiles.map((profile) => (
            <option key={ profile.id } value={ profile.username } />
          )) }
        </datalist>
      </div>
    </div>
  );
}
