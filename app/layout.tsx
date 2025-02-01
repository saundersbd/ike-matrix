import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const HEADER_HEIGHT = "64px";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        style={{ "--header-height": HEADER_HEIGHT } as React.CSSProperties}
      >
        <header className="flex h-[--header-height] items-center border-b border-zinc-200 px-5 z-20">
          <h1 className="text-2xl font-medium">Eisenhower Matrix</h1>
        </header>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 pt-5 pb-8 px-8 h-full min-h-[calc(100svh-var(--header-height))] bg-zinc-50">
            <header className="mb-5 flex shrink-0 items-center h-12 gap-4">
              <SidebarTrigger />
              <h2 className="text-lg font-medium">Eisenhower Matrix</h2>
            </header>
            <div className="h-[calc(100svh-(var(--header-height) + 48px))]">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
