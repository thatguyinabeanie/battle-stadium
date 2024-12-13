import { Suspense } from "react";
import { connection } from "next/server";
import { SignedOut, SignUp } from "@clerk/nextjs";

import { ErrorBoundary } from "~/components/error-boundary";

export default async function SignUpPage() {
  await connection();
  return (
    <section
      aria-label="Sign Up Page"
      className="z-0 m-4 mt-0 flex h-svh w-full flex-col items-center justify-around gap-4 rounded-xl bg-neutral-950"
    >
      <SignedOut>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        </ErrorBoundary>
      </SignedOut>
    </section>
  );
}
