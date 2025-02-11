"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NewSidebar } from "@/components/layout/sidebar/new-sidebar";
import { TaskHeader } from "@/components/layout/task-header";
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

  return (
    <NewTaskDialogContext.Provider
      value={{ openNewTaskDialog, closeNewTaskDialog }}
    >
      <SidebarProvider
        style={{ "--sidebar-width": "260px" } as React.CSSProperties}
      >
        <NewSidebar />
        <SidebarInset className="@container/main">
          <ScrollArea
            type="auto"
            className={cn(
              "w-[calc(100vw-260px)] h-svh",
              "group-has-data-[state=collapsed]/sidebar-wrapper:w-[calc(100vw-3rem)]"
            )}
          >
            <div className="flex flex-row space-x-4 p-4">
              <div className="w-full shrink-0 panel-root">{children}</div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
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
