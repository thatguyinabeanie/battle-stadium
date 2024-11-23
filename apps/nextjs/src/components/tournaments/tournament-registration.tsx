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
  tournamentRegistrationAction: (
    formData: FormData,
  ) => Promise<PostTournamentRegistrationResponse | undefined>;
}
export function TournamentRegistrationForm(
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
          className="md:text-md w-[6rem] px-1 py-1 text-sm lg:w-[7.5rem]"
        >
          {loading ? "Submitting..." : "Submit"}
        </Badge>
      </Button>
    </Form>
  );
}

function useTournamentRegistrationAction({
  tournamentRegistrationAction,
  org_slug,
  tournament_id,
}: Omit<TournamentRegistrationProps, "children">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerForTournament = async (formData: FormData) => {
    setLoading(true);
    try {
      await tournamentRegistrationAction(formData);
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
