import { describe, it, expect } from "vitest";
import { render } from "@/tests/test-utils";
import { TaskKanban } from "../TaskKanban";

describe("TaskKanban", () => {
  it("should render kanban board", () => {
    render(<TaskKanban />);
    expect(document.body).toBeInTheDocument();
  });

  it("should render with material theme", () => {
    render(<TaskKanban />, { defaultTheme: "material" });
    expect(document.body).toBeInTheDocument();
  });

  it("should render with shadcn theme", () => {
    render(<TaskKanban />, { defaultTheme: "shadcn" });
    expect(document.body).toBeInTheDocument();
  });
});
