import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("useTheme", () => {
  it("should have default theme", () => {
    const { result } = renderHook(() => useThemeContext(), { wrapper });
    expect(result.current.theme).toBe("material");
  });

  it("should toggle theme", () => {
    const { result } = renderHook(() => useThemeContext(), { wrapper });
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe("shadcn");
  });

  it("should set theme", () => {
    const { result } = renderHook(() => useThemeContext(), { wrapper });
    
    act(() => {
      result.current.setTheme("shadcn");
    });
    
    expect(result.current.theme).toBe("shadcn");
  });
});
