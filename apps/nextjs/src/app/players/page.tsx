// import PlayersTable from "~/app/players/players-table";
// import { getProfiles } from "~/app/server-actions/profiles/actions";
import ComingSoon from "~/components/coming-soon";

// const columns = [
//   {
//     key: "username",
//     label: "Username",
//   },
//   {
//     key: "pronouns",
//     label: "Pronouns",
//   },
// ];

export default function PlayersPage () {
  // const players = await getProfiles();

  return (
    <ComingSoon
      title={ "Player Profiles" }
    >
      <div className="flex flex-col items-center">
        <h2>Player profiles are under construction</h2>
        <h3>Coming Soon</h3>

      </div>
    </ComingSoon>
  );
}
