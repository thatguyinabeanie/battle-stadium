import { Suspense } from "react";
import { SignedOut, SignUp } from "@clerk/nextjs";

import { ErrorBoundary } from "~/components/error-boundary";

export default function SignUpPage() {
  return (
    <div
      role="main"
      aria-label="Sign in page"
      className="flex h-full min-h-screen w-full items-center justify-center"
    >
      <SignedOut>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        </ErrorBoundary>
      </SignedOut>
    </div>
  );
}
