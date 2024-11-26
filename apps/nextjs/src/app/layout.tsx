import type { ReactNode } from "react";
import { StrictMode } from "react";

import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn, ThemeProvider } from "@battle-stadium/ui";

import type { ChildrenProps } from "~/types";
import { env } from "~/env";
import { siteConfig } from "~/lib/config/site";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

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
interface RootLayoutSlots extends ChildrenProps {
  cookies: ReactNode;
}
export default function RootLayout({
  cookies,
  children,
}: Readonly<RootLayoutSlots>) {
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
            <ThemeProvider attribute="class" defaultTheme="dark">
              <TRPCReactProvider>
                <div className="flex min-h-screen flex-col items-center">
                  <AwesomeParticles />
                  <HydrateClient>
                    <div className="flex w-full flex-col items-center shadow-lg backdrop-blur-md dark:shadow-white/20">
                      {children}
                    </div>
                  </HydrateClient>
                </div>
              </TRPCReactProvider>
              {cookies}
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
