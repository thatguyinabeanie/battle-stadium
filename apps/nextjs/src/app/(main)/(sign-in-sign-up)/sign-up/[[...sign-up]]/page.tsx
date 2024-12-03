import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { SignUp } from "../../_components";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider dynamic>
        <SignUpPageAsync />
      </ClerkProvider>
    </Suspense>
  );
}

async function SignUpPageAsync() {
  const { sessionId } = await auth();

  if (sessionId) {
    return <div>You are signed in.. </div>;
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <SignUp />
    </div>
  );
}
