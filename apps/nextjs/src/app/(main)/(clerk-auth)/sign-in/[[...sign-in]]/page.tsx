import { Suspense } from "react";
import { SignedOut, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignedOut>
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <SignIn />
        </Suspense>
      </div>
    </SignedOut>
  );
}
