import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmer l'action",
  message = "Êtes-vous sûr de vouloir continuer ? Cette action ne peut pas être annulée.",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  isLoading = false,
  variant = "danger",
}: ConfirmationModalProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "text-red-600",
          button: "destructive" as const,
        };
      case "warning":
        return {
          icon: "text-yellow-600",
          button: "secondary" as const,
        };
      default:
        return {
          icon: "text-blue-600",
          button: "default" as const,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        {/* Icon */}
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4`}
        >
          <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
        </div>

        {/* Message */}
        <p className="text-sm text-muted-foreground mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={styles.button}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
