import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppSidebar() {
  return (
    <Sidebar
      side="right"
      className="top-(--header-height) bg-zinc-50 h-[calc(100svh-var(--header-height)-(--spacing(1)))]"
      variant="floating"
    >
      <SidebarHeader className="p-4 pt-5 gap-3">
        <h2 className="text-lg font-medium text-zinc-800">Backlog</h2>
      </SidebarHeader>
      <SidebarContent className="p-3.5">Content</SidebarContent>
      <SidebarFooter className="p-3.5 border-t border-zinc-200">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full">
                <Plus className="w-4 h-4" />
                New backlog item
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[256px]">
              <p>
                Get your to-dos out of your brain so you can prioritize them
                later.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    </Sidebar>
  );
}
