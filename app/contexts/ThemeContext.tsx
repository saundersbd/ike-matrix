"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface ThemeContextType {
  spacing: "default" | "dense";
  setSpacing: (spacing: "default" | "dense") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [spacing, setSpacing] = useState<"default" | "dense">("default");

  const value = {
    spacing,
    setSpacing,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Export ThemeContext to use its Consumer
export { ThemeContext };
