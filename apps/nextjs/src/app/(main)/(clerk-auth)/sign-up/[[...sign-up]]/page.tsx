import { Suspense } from "react";
import { ClerkProvider, SignedOut, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <ClerkProvider dynamic>
      <SignedOut>
        <div className="flex h-full min-h-screen w-full items-center justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}
