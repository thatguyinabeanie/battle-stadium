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

const publicRoutes = createRouteMatcher([
  "/",
  "/about(.*)",
  "/contact(.*)",
  "/docs(.*)",
  "/help(.*)",
  "/cookies(.*)",
  "/terms-of-service(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/image(.*)",
  "/waitlist(.*)",
  "/organizations",
  "/tournaments(.*)",
  "/players(.*)",
  "/analytics(.*)",
  "/pokemon(.*)",
  "/organizations(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!publicRoutes(request)) {
    await auth.protect();
  }
});
