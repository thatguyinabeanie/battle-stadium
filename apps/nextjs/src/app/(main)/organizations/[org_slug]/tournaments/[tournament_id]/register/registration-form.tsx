"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Badge, Button } from "@battle-stadium/ui";

import type { PostTournamentRegistrationResponse } from "~/app/server-actions/tournaments/actions";

interface TournamentRegistrationProps {
  org_slug: string;
  tournament_id: number;
  children?: ReactNode;
  handleTournamentRegistration: (
    formData: FormData,
    tournament_id: number,
  ) => Promise<PostTournamentRegistrationResponse | undefined>;
}
export default function RegistrationForm(
  props: Readonly<TournamentRegistrationProps>,
) {
  const { children } = props;
  const { loading, registerForTournament } =
    useTournamentRegistrationAction(props);

  return (
    <Form action={registerForTournament} className="grid grid-cols-1 gap-4">
      {children}

      <Button
        aria-label="Submit"
        color="primary"
        type="submit"
        disabled={loading}
        className="flex items-center justify-center"
      >
        <Badge
          variant="secondary"
          className="md:text-md text-md w-[6rem] px-1 py-1 lg:w-[7.5rem]"
        >
          {loading ? "Submitting..." : "Submit"}
        </Badge>
      </Button>
    </Form>
  );
}

function useTournamentRegistrationAction({
  handleTournamentRegistration,
  org_slug,
  tournament_id,
}: Omit<TournamentRegistrationProps, "children">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerForTournament = async (formData: FormData) => {
    setLoading(true);
    try {
      await handleTournamentRegistration(formData, tournament_id);
      router.push(`/organizations/${org_slug}/tournaments/${tournament_id}`);
    } catch (error: unknown) {
      console.error(`Registration failed. Please try again.`, error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    registerForTournament,
  };
}
