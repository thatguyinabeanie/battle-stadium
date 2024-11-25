import { createRouteHandler } from "uploadthing/next";

import { UploadThingRouter } from "./core";

export const runtime = "edge";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: UploadThingRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
