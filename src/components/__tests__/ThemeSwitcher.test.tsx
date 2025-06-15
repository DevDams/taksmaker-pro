import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/tests/test-utils";
import { ThemeSwitcher } from "../ThemeSwitcher";

describe("ThemeSwitcher", () => {
  it("should render theme switcher", () => {
    render(<ThemeSwitcher />);
    expect(screen.getByText("Thème:")).toBeInTheDocument();
  });

  it("should display palette icon", () => {
    render(<ThemeSwitcher />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it("should render with material theme", () => {
    render(<ThemeSwitcher />, { defaultTheme: "material" });
    expect(screen.getByText("Thème:")).toBeInTheDocument();
  });

  it("should render with shadcn theme", () => {
    render(<ThemeSwitcher />, { defaultTheme: "shadcn" });
    expect(screen.getByText("Thème:")).toBeInTheDocument();
  });
});
