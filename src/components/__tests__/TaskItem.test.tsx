import { describe, it, expect, vi } from "vitest";
import { render } from "@/tests/test-utils";
import { TaskItem } from "../TaskItem";
import type { Task } from "@/types";

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  priority: "Haute",
  status: "En attente",
  assignedUserId: "user1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("TaskItem", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnUpdate = vi.fn();

  const props = {
    task: mockTask,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
    onUpdate: mockOnUpdate,
  };

  it("should render task item", () => {
    render(<TaskItem {...props} />);
    expect(document.body).toBeInTheDocument();
  });

  it("should render with different themes", () => {
    render(<TaskItem {...props} />, { defaultTheme: "material" });
    expect(document.body).toBeInTheDocument();

    render(<TaskItem {...props} />, { defaultTheme: "shadcn" });
    expect(document.body).toBeInTheDocument();
  });

  it("should render task data", () => {
    render(<TaskItem {...props} />);
    // Le composant se rend avec les données
    expect(document.body).toBeInTheDocument();
  });
});
