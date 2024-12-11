import { Suspense } from "react";
import { SignedOut, SignIn } from "@clerk/nextjs";

import { ErrorBoundary } from "~/components/error-boundary";

export default function SignInPage() {
  return (
    <section
      aria-label="Sign In Page"
      className="z-0 m-4 mt-0 flex h-svh w-full flex-col items-center justify-around gap-4 rounded-xl bg-neutral-950"
    >
      <SignedOut>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
          </Suspense>
        </ErrorBoundary>
      </SignedOut>
    </section>
  );
}
