import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export const experimental_ppr = false;

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />;
    </Suspense>
  );
}
