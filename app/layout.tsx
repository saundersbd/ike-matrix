import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { WorkspaceProvider } from "@/app/contexts/WorkspaceContext";
import { Toaster } from "@/components/ui/toaster";
import { ManageProjectsDialog } from "@/components/dialogs/manage-projects-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { InfoSheet } from "@/components/layout/info-sheet";
import { Cog } from "lucide-react";

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
          "antialiased font-sans bg-zinc-white text-zinc-800",
          modal ? "overflow-hidden" : "overflow-auto"
        )}
        style={{ "--header-height": HEADER_HEIGHT } as React.CSSProperties}
      >
        <WorkspaceProvider>
          <div className="relative flex flex-col">
            <header className="hidden sticky top-0 h-[var(--header-height)] items-center shrink-0 justify-between bg-zinc-950 px-8 z-20 text-zinc-100 gap-2">
              <h1 className="inline-flex text-xl font-medium">
                Eisenhower Matrix
              </h1>
              <div className="flex items-center gap-3">
                <InfoSheet />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-100 hover:bg-zinc-700 hover:text-zinc-50"
                    >
                      <Cog className="!w-5 !h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56"
                    collisionPadding={{ right: 16 }}
                  >
                    <DropdownMenuItem>
                      <span>Manage projects</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <div className="flex flex-1">
              <div className="hidden relative w-[64px] shrink-0 h-[100svh] bg-zinc-900 z-50">
                Nav
              </div>
              <div className="flex flex-1 overflow-hidden">
                {children}
                {modal}
              </div>
            </div>
          </div>
          <ManageProjectsDialog />
          <Toaster />
        </WorkspaceProvider>
      </body>
    </html>
  );
}
