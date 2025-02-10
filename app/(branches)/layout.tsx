"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { WorkspaceProvider } from "@/app/contexts/WorkspaceContext";
import { Toaster } from "@/components/ui/toaster";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { FilterChip } from "@/components/controls/filtering/filter-chip";
import { TASK_SORT_OPTIONS, SortOption } from "@/lib/sort-options";
import { WorkspaceContent } from "@/components/workspace-content";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/app/types/Task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewSwitcher } from "@/components/controls/view-switcher";
import { SortOptionListItem } from "@/components/lists/sort-option-list-item";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/InterVariable.woff2",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function BranchesLayout({ children }: RootLayoutProps) {
  const [sortBy, setSortBy] = useState("created");
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className={cn("antialiased font-sans bg-zinc-50 text-zinc-800")}>
        <WorkspaceProvider>
          <WorkspaceContent>
            <header className="flex h-14 px-5 shrink-0 items-center justify-between bg-white/90 border-b border-zinc-200/50">
              <SidebarTrigger />
              <div className="flex items-center gap-3">
                <FilterChip<SortOption<Task>>
                  label="created date"
                  options={TASK_SORT_OPTIONS}
                  onApplyFilter={(option) => setSortBy(option.id)}
                  onResetFilter={() => setSortBy("created")}
                  itemNode={(option) => <SortOptionListItem option={option} />}
                  behavior="sort"
                  getItemId={(option) => option.id}
                  getDisplayValue={(option) => option.label}
                  value={TASK_SORT_OPTIONS.find(
                    (option) => option.id === sortBy
                  )}
                  defaultValue={TASK_SORT_OPTIONS.find(
                    (option) => option.id === "created"
                  )}
                />
              </div>
            </header>
            <ScrollArea className="h-[calc(100svh-3.5rem)]">
              {children}
            </ScrollArea>
          </WorkspaceContent>

          <Toaster />
        </WorkspaceProvider>
      </body>
    </html>
  );
}
