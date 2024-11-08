import { auth } from "@clerk/nextjs/server";
import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const uploadThing = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const UploadThingRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: uploadThing({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const { userId } = await auth();

      // If you throw, the user will not be able to upload
      if (!userId) {
        throw new Error(new UploadThingError("Unauthorized").message);
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the client `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadThingFileRouter = typeof UploadThingRouter;
