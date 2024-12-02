import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import { ClerkAuthCheck } from "~/app/(main)/(sign-in-sign-up)/_components/clerk-auth-check";

export default function SignInPage () {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Suspense fallback={ null }>
        <ClerkAuthCheck>
          <SignUp />
        </ClerkAuthCheck>
      </Suspense>
    </div>
  );
}
