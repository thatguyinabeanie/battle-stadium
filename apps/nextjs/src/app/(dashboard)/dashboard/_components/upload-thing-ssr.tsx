import { connection } from "next/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { UploadThingRouter } from "~/app/api/uploadthing/core";

export default async function UploadThingSSR() {
  try {
    await connection();
  } catch (error) {
    console.error('Failed to establish connection:', error);
    throw error; // Or handle gracefully based on requirements
  }
  return (
    <NextSSRPlugin routerConfig={extractRouterConfig(UploadThingRouter)} />
  );
}
