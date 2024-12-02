import { Suspense } from "react";
import { ClerkAuth } from "~/app/(main)/(sign-in-sign-up)/_components/clerk-auth";

export default function SignInPage () {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Suspense fallback={ null }>
        <ClerkAuth type="sign-up" />
      </Suspense>
    </div>
  );
}
