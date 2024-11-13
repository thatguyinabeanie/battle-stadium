import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn, ThemeProvider } from "@battle-stadium/ui";

// import { cn, ThemeProvider, ThemeToggle } from "@battle-stadium/ui";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { StrictMode } from "react";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import type { ChildrenProps } from "~/types";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar/navbar";
import { siteConfig } from "~/lib/config/site";
import { UploadThingRouter } from "./api/uploadthing/core";

const Cookies = dynamic(() => import("~/components/cookies/cookies"));
const AwesomeParticles = dynamic(
  () => import("~/components/awesome-particles"),
);

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://battlestadium.gg"
      : "http://localhost:3000",
  ),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/beanie-72x72.png",
  },
  openGraph: {
    title: "Battle Stadium",
    description: siteConfig.description,
    url: "https://battlestadium.gg",
    siteName: "Battle Stadium",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thatguyinabeanie",
    creator: "@thatguyinabeanie",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<ChildrenProps>) {
  const { userId, sessionId } = await auth();

  return (
    <StrictMode>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "min-h-screen overflow-y-scroll bg-background font-sans text-foreground antialiased",
              GeistSans.variable,
              GeistMono.variable,
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <TRPCReactProvider>
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(UploadThingRouter)}
                />
                <div className="flex min-h-screen flex-col items-center">
                  <AwesomeParticles />

                  <div className="flex min-h-screen w-5/6 flex-col items-center shadow-2xl backdrop-blur-lg dark:shadow-white">
                    <Navbar />

                    <main className="flex min-h-screen w-full flex-col items-center">
                      <section className="z-0 flex w-full flex-col items-center gap-4">
                        {children}
                      </section>
                    </main>

                    <Footer />
                  </div>
                </div>
              </TRPCReactProvider>

              {/* <div className="absolute bottom-4 right-4">
                <ThemeToggle />
              </div> */}

              <Cookies isSignedIn={!!sessionId} userId={userId} />

              <VercelAnalytics />

              {env.VERCEL_ENV === "production" && <VercelSpeedInsights />}

              <GoogleAnalytics gaId={env.MEASUREMENT_ID} />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </StrictMode>
  );
}
