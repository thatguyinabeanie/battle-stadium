// cookies-slot.tsx
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";

const Cookies = dynamic(() => import("~/components/cookies/cookies"));

export default async function CookiesServerComponent () {
  const { userId, sessionId } = await auth();
  return <CookiesComponent isSignedIn={ !!sessionId } userId={ userId } />;
}

function CookiesComponent ({ isSignedIn, userId }: { isSignedIn: boolean; userId: string | null }) {
  // "use cache";
  return <Cookies isSignedIn={ isSignedIn } userId={ userId } />;
}