import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { WorkspaceProvider } from "@/app/contexts/WorkspaceContext";
import { Toaster } from "@/components/ui/toaster";
import { WorkspaceContent } from "@/components/workspace-content";

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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className={cn("antialiased font-sans bg-zinc-50 text-zinc-800")}>
        <WorkspaceProvider>
          <WorkspaceContent>{children}</WorkspaceContent>
          <Toaster />
        </WorkspaceProvider>
      </body>
    </html>
  );
}
