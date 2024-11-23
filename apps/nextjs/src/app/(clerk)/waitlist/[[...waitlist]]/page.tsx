import { Suspense } from "react";
import { Waitlist } from "@clerk/nextjs";

import CheckLoggedIn from "./check-logged-in";

export default function WaitlistPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckLoggedIn>
        <Waitlist />
      </CheckLoggedIn>
    </Suspense>
  );
}
