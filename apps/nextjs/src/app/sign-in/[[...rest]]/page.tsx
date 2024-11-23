import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export const experimental_ppr = false;

export default function SignInPage () {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <SignIn />
    </Suspense>
  );
}
