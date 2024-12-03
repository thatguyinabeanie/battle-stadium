import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { SignIn } from "../../_components";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider dynamic>
        <SignInPageAsync />
      </ClerkProvider>
    </Suspense>
  );
}

async function SignInPageAsync() {
  const { sessionId } = await auth();

  if (sessionId) {
    return <div>You are signed in.. </div>;
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <SignIn />
    </div>
  );
}
