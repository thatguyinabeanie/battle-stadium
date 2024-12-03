import { Suspense } from "react";

import UploadThingButton from "./_components/upload-thing-button";
import UploadThingSSR from "./_components/upload-thing-ssr";

// export const experimental_ppr = false;

export default function Admin() {
  return (
    <div>
      <Suspense>
        <UploadThingSSR />
      </Suspense>
      <UploadThingButton />
    </div>
  );
}
