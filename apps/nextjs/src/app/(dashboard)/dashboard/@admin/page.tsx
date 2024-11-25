"use client";

import { Suspense } from "react";

import { UploadButton } from "~/components/upload-thing/components";
import UploadThingSSR from "./_components/upload-thing-ssr";

export default function Admin() {
  return (
    <div>
      <Suspense>
        <UploadThingSSR />
      </Suspense>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
