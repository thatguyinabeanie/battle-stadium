import { Suspense } from "react";
import { SignedOut, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignedOut>
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <SignUp />
        </Suspense>
      </div>
    </SignedOut>
  );
}
