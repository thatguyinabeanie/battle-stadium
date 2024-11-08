import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { env } from "~/env.ts";

import { ThemeProvider, ThemeToggle, cn } from "@battle-stadium/ui";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { StrictMode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { UploadThingRouter } from "./api/uploadthing/core";
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";
import { siteConfig } from "~/lib/config/site";
import type { ChildrenProps } from "~/types";
import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer";

const Cookies = dynamic(() => import("~/components/cookies/cookies"));
const AwesomeParticles = dynamic(() => import("~/components/awesome-particles"));


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
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Battle Stadium",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://battlestadium.gg",
    siteName: "Battle Stadium",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thatguyinabenaie",
    creator: "@thatguyinabenaie",
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

export default async function RootLayout (
  { children }: Readonly<ChildrenProps>,
) {
  const { userId, sessionId } = await auth();

  return (
    <StrictMode>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>

          <body
            className={ cn(
              "min-h-screen bg-background font-sans text-foreground overflow-y-scroll antialiased",
              GeistSans.variable,
              GeistMono.variable,
            ) }
          >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <TRPCReactProvider>
                <NextSSRPlugin routerConfig={ extractRouterConfig(UploadThingRouter) } />
                <div className="flex flex-col items-center min-h-screen ">
                  {/* <AwesomeParticles /> */ }

                  <div className="flex flex-col items-center min-h-screen backdrop-blur shadow-2xl dark:shadow-white w-5/6 ">
                    <Navbar />

                    <main className="flex flex-col min-h-screen items-center w-full">
                      <section className="flex flex-col gap-4 w-full items-center z-0">{ children }</section>
                    </main>

                    <Footer />
                  </div>
                </div>

              </TRPCReactProvider>

              <div className="absolute bottom-4 right-4">
                <ThemeToggle />
              </div>


              <Cookies isSignedIn={ !!sessionId } userId={ userId } />

              <VercelAnalytics />

              { env.VERCEL_ENV === "production" && <VercelSpeedInsights /> }

              <GoogleAnalytics gaId={ env.MEASUREMENT_ID } />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </StrictMode>
  );
}
