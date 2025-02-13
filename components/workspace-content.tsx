"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import {
  MultiSidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NewSidebar } from "@/components/layout/sidebar/new-sidebar";
import { RightPanel } from "@/components/layout/right_panel/right-panel";
import { navigationItems } from "@/lib/navigation";
import { QUADRANTS, Quadrant } from "@/app/types/Quadrant";
import { NewTaskDialog } from "@/components/dialogs/new-task-dialog";

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

export function WorkspaceContent({ children }: WorkspaceContentProps) {
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
              ["--sidebar-width" as string]: "224px",
              ["--right-sidebar-width" as string]: "260px",
            } as React.CSSProperties
          }
        >
          <NewSidebar side="left" collapsible="none" variant="inset" />

          <div className="relative flex flex-col flex-1 m-2.5 ring-1 ring-zinc-950/[.04] shadow-xs rounded-lg overflow-hidden bg-zinc-100">
            <div className="flex flex-col flex-1 h-[calc(100svh-1.25rem)]">
              <header className="flex h-11 shrink-0 items-center justify-between pl-6 pr-3 border-b border-default-border/60 bg-background">
                <h1 className="text-sm font-medium">{pageTitle.title}</h1>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-7">
                    <Ellipsis className="!size-4" />
                  </Button>

                  <Separator
                    className="h-4 mx-1.5 bg-default-border/60"
                    orientation="vertical"
                  />

                  <SidebarTrigger
                    side="right"
                    onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                  />
                </div>
              </header>

              <div className="relative flex flex-1">
                <SidebarInset className="@container/main flex flex-col flex-1">
                  <ScrollArea className="flex flex-col flex-1">
                    {children}
                  </ScrollArea>
                </SidebarInset>
                <RightPanel side="right" />
              </div>
            </div>
          </div>
        </MultiSidebarProvider>
      </main>

      <NewTaskDialog
        isOpen={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
        defaultDestination={getDestinationQuadrant()}
      />
    </NewTaskDialogContext.Provider>
  );
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
