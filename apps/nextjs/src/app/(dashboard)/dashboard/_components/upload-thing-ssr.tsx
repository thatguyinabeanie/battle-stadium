import { connection } from "next/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { UploadThingRouter } from "~/app/api/uploadthing/core";

export default async function UploadThingSSR() {
  await connection();
  return (
    <NextSSRPlugin routerConfig={extractRouterConfig(UploadThingRouter)} />
  );
}
