import { Suspense } from "react";

import CookiesServerComponent from "./cookies-server-component";

export default function CookiesSlot() {
  return (
    <Suspense fallback={null}>
      <CookiesServerComponent />
    </Suspense>
  );
}
