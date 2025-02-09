import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarSeparator,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { Scroll, Circle } from "lucide-react";

export function SlimSidebar({
  ...props
}: Partial<React.ComponentProps<typeof Sidebar>>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-none"
      {...props}
      data-theme="dark"
    >
      <SidebarHeader className="p-5 bg-slate-800">
        <span className="group-data-[state=collapsed]:hidden truncate text-lg text-zinc-700 font-medium dark:text-zinc-100">
          Eisenhower matrix
        </span>
      </SidebarHeader>
      <SidebarContent className="bg-slate-800">
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
