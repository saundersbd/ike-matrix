import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
export function SlimSidebar({
  ...props
}: Partial<React.ComponentProps<typeof Sidebar>>) {
  return (
    <Sidebar collapsible="icon" className="border-none" {...props}>
      {/* <SidebarHeader className="p-5 bg-zinc-100">
        <span className="hidden text-lg text-zinc-700 font-medium">
          Eisenhower matrix
        </span>
      </SidebarHeader> */}
      <SidebarContent className="bg-zinc-100">
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
