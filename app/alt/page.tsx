import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SlimSidebar } from "@/components/layout/slim_sidebar/slim-sidebar";

export default function Alt() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
        } as React.CSSProperties
      }
    >
      <SlimSidebar />
      <SidebarInset className="bg-zinc-50 p-6">
        <div className="flex flex-col flex-1 container max-w-6xl mx-auto">
          <header className="flex h-16 shrink-0 items-center border-b border-zinc-200">
            <SidebarTrigger />
          </header>
          <div className="flex flex-1 flex-col pt-6">
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6">
              <div className="bg-yellow-300 rounded-lg p-4"></div>
              <div className="bg-yellow-300 rounded-lg p-4"></div>
              <div className="bg-yellow-300 rounded-lg p-4"></div>
              <div className="bg-yellow-300 rounded-lg p-4"></div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
