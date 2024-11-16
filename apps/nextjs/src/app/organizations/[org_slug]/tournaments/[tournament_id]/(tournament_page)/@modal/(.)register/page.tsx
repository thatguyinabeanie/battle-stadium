import { Suspense } from "react";
import { redirect } from "next/navigation";

import type { RegisterProps } from "../../../register/page";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import TournamentRegistration from "~/components/tournaments/tournament-registration";
import Modal from "~/components/tournaments/tournament-registration-modal";

export default async function Register(props: Readonly<RegisterProps>) {
  const params = await props.params;

  const me = await getAccountMe();

  if (!me) {
    redirect("/sign-in");
  }

  return (
    <Modal>
      <Suspense fallback={<div>Loading...</div>}>
        <TournamentRegistration
          org_slug={params.org_slug}
          tournament_id={params.tournament_id}
          me={me}
        />
      </Suspense>
    </Modal>
  );
}
