import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const maxWidth = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth[size] as unknown as "sm" | "md" | "lg" | "xl"}
      fullWidth
    >
      {title && (
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {title}
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
