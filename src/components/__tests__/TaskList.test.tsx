import { describe, it, expect } from "vitest";
import { render } from "@/tests/test-utils";
import { TaskList } from "../TaskList";

describe("TaskList", () => {
  it("should render task list", () => {
    render(<TaskList />);
    // Vérifier que le composant se rend sans erreur
    expect(document.body).toBeInTheDocument();
  });

  it("should render with material theme", () => {
    render(<TaskList />, { defaultTheme: "material" });
    expect(document.body).toBeInTheDocument();
  });

  it("should render with shadcn theme", () => {
    render(<TaskList />, { defaultTheme: "shadcn" });
    expect(document.body).toBeInTheDocument();
  });
});
