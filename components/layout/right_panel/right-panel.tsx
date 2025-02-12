import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export function RightPanel({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" className="flex p-3 pl-0" {...props}>
      <SidebarContent className="flex flex-col items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center flex-1">
          Empty state
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
