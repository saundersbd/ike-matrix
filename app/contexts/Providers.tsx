"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { WorkspaceProvider } from "@/app/contexts/WorkspaceContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <WorkspaceProvider>{children}</WorkspaceProvider>
    </ThemeProvider>
  );
}
