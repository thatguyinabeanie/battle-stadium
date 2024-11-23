import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { env } from "./env";

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    // "/((?!_next/static/css/app/ReactToastify.css.*))",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/waitlist(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (
    [env.NODE_ENV, env.VERCEL_ENV].includes("development") &&
    !publicRoutes(request)
  ) {
    await auth.protect();
  }
});
