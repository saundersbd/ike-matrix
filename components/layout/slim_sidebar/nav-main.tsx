"use client";

import { Circle, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function NavMain({
  items,
}: {
  items: Record<
    string,
    {
      label: string;
      path: string;
      icon: LucideIcon;
      subItems?: {
        label: string;
        path: string;
        theme: string;
      }[];
    }
  >;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarGroup>
      <SidebarMenu className="font-medium">
        {Object.entries(items).map(([key, item]) => (
          <SidebarMenuItem key={key}>
            <SidebarMenuButton isActive={isActive(item.path)} asChild>
              <Link
                href={item.path}
                className="flex items-center gap-2 text-base font-medium"
              >
                <item.icon className="!size-4" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
            {item.subItems && (
              <SidebarMenuSub>
                {item.subItems.map((subItem: any) => (
                  <SidebarMenuSubItem key={subItem.path}>
                    <SidebarMenuSubButton
                      isActive={isActive(subItem.path)}
                      asChild
                    >
                      <Link
                        href={subItem.path}
                        className="flex items-center gap-2.5 text-sm font-medium"
                      >
                        <Circle className={`!size-2 ${subItem.theme}`} />
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
