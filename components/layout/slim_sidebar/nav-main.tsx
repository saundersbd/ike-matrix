"use client";

import { Circle, Inbox, ListOrdered, Scroll } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu className="font-medium">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Inbox />
            <span>Inbox</span>
          </SidebarMenuButton>
          <SidebarMenuBadge>8</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <ListOrdered />
            <span>Prioritized tasks</span>
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-red-500 fill-red-500" />
                <span>Urgent &amp; important</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-amber-400 fill-amber-400" />
                <span>Urgent &amp; not important</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-sky-500 fill-sky-500" />
                <span>Important &amp; not urgent</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-purple-500 fill-purple-500" />
                <span>Neither urgent nor important</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Scroll />
            <span>History</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
