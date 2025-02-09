"use client";

import { Circle, Inbox, ListOrdered, Scroll } from "lucide-react";
import Link from "next/link";

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
          <SidebarMenuButton isActive>
            <ListOrdered />
            <span>Prioritized tasks</span>
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm" asChild>
                <Link href="/q1" replace>
                  <Circle className="!size-2 !text-red-400 fill-red-400" />
                  <span>Urgent &amp; important</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-amber-300 fill-amber-300" />
                <span>Urgent &amp; not important</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-sky-400 fill-sky-400" />
                <span>Important &amp; not urgent</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton size="sm">
                <Circle className="!size-2 !text-purple-400 fill-purple-400" />
                <span>Neither urgent nor important</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
          <SidebarMenuBadge>8</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Inbox />
            <span>Inbox</span>
          </SidebarMenuButton>
          <SidebarMenuBadge>8</SidebarMenuBadge>
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
