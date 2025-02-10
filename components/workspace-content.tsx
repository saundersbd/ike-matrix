"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SlimSidebar } from "@/components/layout/slim_sidebar/slim-sidebar";
import { TaskHeader } from "@/components/layout/task-header";
import { navigationItems } from "@/lib/navigation";
type WorkspaceContentProps = {
  children: React.ReactNode;
};

export function WorkspaceContent({ children }: WorkspaceContentProps) {
  const pathname = usePathname();

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
    <SidebarProvider
      className="relative flex flex-1 overflow-hidden"
      style={{ "--sidebar-width": "300px" } as React.CSSProperties}
    >
      <SlimSidebar />
      <SidebarInset className="bg-white/50">
        <TaskHeader pageTitle={getCurrentPageTitle()} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
