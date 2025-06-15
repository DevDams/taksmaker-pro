import { useTheme } from "@/hooks/useTheme";
import { Dropdown as MaterialDropdown } from "@/themes/material/Dropdown";
import { Dropdown as ShadcnDropdown } from "@/themes/shadcn/Dropdown";

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Dropdown(props: DropdownProps) {
  const { theme } = useTheme();

  // Retourner le composant dropdown approprié selon le thème
  if (theme === "material") {
    return <MaterialDropdown {...props} />;
  }

  return <ShadcnDropdown {...props} />;
}
