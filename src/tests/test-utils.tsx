import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { ThemeType } from "@/types";

interface RenderOptions {
  defaultTheme?: ThemeType;
}

export function render(
  ui: React.ReactElement,
  { defaultTheme = "material" }: RenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper });
}

export * from "@testing-library/react";
