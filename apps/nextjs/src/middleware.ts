import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// const protectedRoutes = createRouteMatcher([
//   "/api/(.*)",
//   "/server-actions/(.*)",
//   "/dashboard",
//   "/dashboard/(.*)",
//   "/pokemon(.*)",
//   "/organizations/:orgSlug/tournaments/:tournamentId/register",
// ]);

const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/images/(.*)",
  "/ads.txt",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!publicRoutes(request)) {
    await auth.protect();
  }
});
