import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { WorkspaceContent } from "@/components/workspace-content";
import { Providers } from "./contexts/Providers";

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
    <html
      lang="en"
      data-spacing="default"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body
        className={cn(
          "relative antialiased font-sans bg-stone-100 text-stone-800"
        )}
      >
        <Providers>
          <WorkspaceContent>{children}</WorkspaceContent>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
