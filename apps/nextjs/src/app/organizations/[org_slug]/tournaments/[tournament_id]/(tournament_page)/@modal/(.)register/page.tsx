import { redirect } from "next/navigation";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
import Modal from "~/components/modal";
import TournamentRegistration from "~/components/tournaments/tournament-registration";
import type { RegisterProps } from "../../register/page";

export default async function Register (props: Readonly<RegisterProps>) {
  const params = await props.params;

  const me = await getAccountMe();

  if (!me) {
    redirect("/sign-in");
  }

  const profiles = await getProfilesByAccountId(me.id);

  return (
    <Modal>
      <TournamentRegistration
        org_slug={ params.org_slug }
        profiles={ profiles }
        tournament_id={ params.tournament_id }
      />
    </Modal>
  )
}
