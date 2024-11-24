import { auth } from "@clerk/nextjs/server";
import Cookies  from "~/app/@cookies/cookies-client-component";

export default async function CookiesServerComponent() {
  const { userId, sessionId } = await auth();
  return <Cookies isSignedIn={ !!sessionId } userId={userId} />;
}
