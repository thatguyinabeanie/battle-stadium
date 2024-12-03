import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { SignUp } from "../../_components";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider dynamic>
        <div className="flex h-full min-h-screen w-full items-center justify-center">
          <SignUp />
        </div>
      </ClerkProvider>
    </Suspense>
  );
}
