"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  // Hindari script injeksi tema dieksekusi ulang ketika client-render.
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      scriptProps={scriptProps}
    >
      {children}
    </ThemeProvider>
  );
}
