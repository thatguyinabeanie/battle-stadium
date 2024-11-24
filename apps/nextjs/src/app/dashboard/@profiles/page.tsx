import { getProfilesMe } from "~/app/(main)/server-actions/profiles/actions";
import NewProfile from "~/components/profiles/new-profile";

export default async function Profiles() {
  const profiles = await getProfilesMe();

  return (
    <div>
      <NewProfile />
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h3>{profile.username}</h3>
        </div>
      ))}
    </div>
  );
}
