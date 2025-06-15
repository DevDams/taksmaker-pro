import { useTheme } from "@/hooks/useTheme";
import { Dropdown } from "@/components/ui/Dropdown";
import { Palette } from "lucide-react";

const THEME_OPTIONS = [
  {
    value: "material",
    label: "Material UI",
  },
  {
    value: "shadcn",
    label: "Shadcn",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    setTheme(value as "material" | "shadcn");
  };

  return (
    <div className="">
      <div className="min-w-32">
        <div className="flex items-center gap-1 mb-1">
          <Palette size={14} />
          <span className="text-xs font-bold">Thème:</span>
        </div>
        <Dropdown
          options={THEME_OPTIONS}
          value={theme}
          onChange={handleThemeChange}
          placeholder="Choisir un thème"
          label="Thème"
        />
      </div>
    </div>
  );
}
