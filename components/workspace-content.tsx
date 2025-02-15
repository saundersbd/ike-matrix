"use client";

import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import {
  MultiSidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NewSidebar } from "@/components/layout/sidebar/new-sidebar";
import { RightPanel } from "@/components/layout/right_panel/right-panel";
import { navigationItems } from "@/lib/navigation";
import { QUADRANTS, Quadrant } from "@/app/types/Quadrant";
import { NewTaskDialog } from "@/components/dialogs/new-task-dialog";

const SidebarContext = createContext<{
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

type WorkspaceContentProps = {
  children: React.ReactNode;
};

// Create a context for the dialog
type NewTaskDialogContextType = {
  openNewTaskDialog: (quadrant?: Quadrant) => void;
  closeNewTaskDialog: () => void;
};

export const NewTaskDialogContext = createContext<
  NewTaskDialogContextType | undefined
>(undefined);

export function WorkspaceContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant | null>(
    null
  );
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const openNewTaskDialog = (quadrant?: Quadrant) => {
    setSelectedQuadrant(quadrant || null);
    setIsNewTaskDialogOpen(true);
  };
  const closeNewTaskDialog = () => setIsNewTaskDialogOpen(false);

  const getDestinationQuadrant = () => {
    if (selectedQuadrant) return selectedQuadrant;

    const quadrantNumber = pathname.split("/").pop();
    if (!quadrantNumber) return QUADRANTS[0];
    const quadrant = QUADRANTS.find((q) => q.id === parseInt(quadrantNumber));
    return quadrant || QUADRANTS[0];
  };

  const getCurrentPageTitle = () => {
    const currentPath = pathname;

    // Check main items
    for (const key in navigationItems) {
      const item = navigationItems[key as keyof typeof navigationItems];
      if (item.path === currentPath) {
        return { title: item.label, icon: item.icon };
      }

      // Check subitems if they exist
      if (item.subItems) {
        const subItem = item.subItems.find((sub) => sub.path === currentPath);
        if (subItem) {
          return { title: subItem.label, icon: item.icon };
        }
      }
    }

    return { title: "Tasks" }; // Default fallback
  };

  const pageTitle = getCurrentPageTitle();

  return (
    <SidebarContext.Provider
      value={{ isRightSidebarOpen, setIsRightSidebarOpen }}
    >
      <NewTaskDialogContext.Provider
        value={{ openNewTaskDialog, closeNewTaskDialog }}
      >
        <main className="relative flex h-screen">
          <MultiSidebarProvider
            rightOpen={isRightSidebarOpen}
            onRightOpenChange={setIsRightSidebarOpen}
            className=""
            style={
              {
                ["--sidebar-width" as string]: "248px",
                ["--right-sidebar-width" as string]: "380px",
              } as React.CSSProperties
            }
          >
            <NewSidebar side="left" collapsible="none" variant="inset" />

            <div className="relative flex flex-col flex-1 m-2.5 ml-[2px] ring-1 ring-zinc-950/[.04] shadow-xs rounded-lg overflow-hidden bg-zinc-50">
              {children}
            </div>
          </MultiSidebarProvider>
        </main>

        <NewTaskDialog
          isOpen={isNewTaskDialogOpen}
          onOpenChange={setIsNewTaskDialogOpen}
          defaultDestination={getDestinationQuadrant()}
        />
      </NewTaskDialogContext.Provider>
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx)
    throw new Error("useSidebarContext must be used inside WorkspaceContent");
  return ctx;
}

export function useNewTaskDialog() {
  const context = useContext(NewTaskDialogContext);
  if (context === undefined) {
    throw new Error(
      "useNewTaskDialog must be used within a WorkspaceContent component"
    );
  }
  return context;
}
