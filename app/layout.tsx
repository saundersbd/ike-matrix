import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { WorkspaceProvider } from "@/app/contexts/WorkspaceContext";
import { Toaster } from "@/components/ui/toaster";
import { InfoSheet } from "@/components/info-sheet";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/InterVariable.woff2",
      weight: "100 900",
    },
    {
      path: "../public/fonts/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const HEADER_HEIGHT = "64px";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body
        className={cn(
          "antialiased font-sans bg-zinc-50 text-zinc-800",
          modal ? "overflow-hidden" : "overflow-auto"
        )}
        style={{ "--header-height": HEADER_HEIGHT } as React.CSSProperties}
      >
        <WorkspaceProvider>
          <div className="relative">
            <header className="sticky top-0 flex h-[var(--header-height)] items-center justify-between bg-zinc-900 px-8 z-20 text-zinc-100 gap-2">
              <h1 className="inline-flex text-xl font-medium">
                Eisenhower Matrix
              </h1>
              <InfoSheet />
            </header>
            {children}
            {modal}
            <Toaster />
          </div>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
