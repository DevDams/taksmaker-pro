import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton du dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-full bg-neutral-100 border border-input rounded-md px-3 py-1.5 text-left cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "hover:bg-accent/50 transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-normal">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </div>
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-md shadow-lg animate-in fade-in-0 zoom-in-95">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-2 text-left transition-colors",
                  "hover:bg-accent/50 focus:bg-accent/50 focus:outline-none",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-normal text-foreground">
                      {option.label}
                    </div>
                  </div>
                  {value === option.value && (
                    <Check size={16} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
