import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "@/tests/test-utils";
import { ConfirmationModal } from "../ConfirmationModal";

describe("ConfirmationModal", () => {
  const mockOnConfirm = vi.fn();
  const mockOnClose = vi.fn();

  const props = {
    isOpen: true,
    title: "Confirmer",
    message: "Êtes-vous sûr ?",
    onConfirm: mockOnConfirm,
    onClose: mockOnClose,
  };

  it("should render when open", () => {
    render(<ConfirmationModal {...props} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Êtes-vous sûr ?")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(<ConfirmationModal {...props} isOpen={false} />);
    expect(screen.queryByText("Confirmer")).not.toBeInTheDocument();
  });

  it("should call onConfirm when clicked", () => {
    render(<ConfirmationModal {...props} />);
    const button = screen.getByRole("button", { name: /confirmer/i });
    fireEvent.click(button);
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("should call onClose when cancelled", () => {
    render(<ConfirmationModal {...props} />);
    const button = screen.getByRole("button", { name: /annuler/i });
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
