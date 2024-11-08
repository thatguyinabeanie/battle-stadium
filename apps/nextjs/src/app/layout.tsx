import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@battle-stadium/ui/utils";
import { ThemeProvider, ThemeToggle } from "@battle-stadium/ui/theme";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://battlestadium.gg"
      : "http://localhost:3000",
  ),
  title: "Battle Stadium",
  description: "Simple monorepo with shared backend for web & mobile apps",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout (
  props: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={ cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        ) }
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{ props.children }</TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
