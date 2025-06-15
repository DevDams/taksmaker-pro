import { useTheme } from "@/hooks/useTheme";
import { Modal as MaterialModal } from "@/themes/material/Modal";
import { Modal as ShadcnModal } from "@/themes/shadcn/Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal(props: ModalProps) {
  const { theme } = useTheme();

  if (theme === "material") {
    return <MaterialModal {...props} />;
  }

  return <ShadcnModal {...props} />;
}
