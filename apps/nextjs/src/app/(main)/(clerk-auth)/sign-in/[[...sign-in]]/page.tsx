import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { SignIn } from "../../_components";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider dynamic>
        <div className="flex h-full min-h-screen w-full items-center justify-center">
          <SignIn />
        </div>
      </ClerkProvider>
    </Suspense>
  );
}
