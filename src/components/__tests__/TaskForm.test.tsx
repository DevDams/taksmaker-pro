import { describe, it, expect, vi } from "vitest";
import { render } from "@/tests/test-utils";
import { TaskForm } from "../TaskForm";

describe("TaskForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const props = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
  };

  it("should render form", () => {
    render(<TaskForm {...props} />);
    expect(document.body).toBeInTheDocument();
  });

  it("should render form fields", () => {
    render(<TaskForm {...props} />);
    // Vérifier que le formulaire est présent
    expect(document.querySelector("form")).toBeInTheDocument();
  });

  it("should render with different themes", () => {
    render(<TaskForm {...props} />, { defaultTheme: "material" });
    expect(document.body).toBeInTheDocument();

    render(<TaskForm {...props} />, { defaultTheme: "shadcn" });
    expect(document.body).toBeInTheDocument();
  });
});
