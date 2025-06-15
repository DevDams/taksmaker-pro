import { describe, it, expect } from "vitest";
import { render } from "@/tests/test-utils";
import App from "@/App";

describe("App Tests", () => {
  it("should render app", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it("should render with different themes", () => {
    render(<App />, { defaultTheme: "material" });
    expect(document.body).toBeInTheDocument();
    
    render(<App />, { defaultTheme: "shadcn" });
    expect(document.body).toBeInTheDocument();
  });

  it("should render quickly", () => {
    const start = performance.now();
    render(<App />);
    const time = performance.now() - start;
    expect(time).toBeLessThan(1000);
  });
});
