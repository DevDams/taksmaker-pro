import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  type SelectChangeEvent,
} from "@mui/material";
import { Check } from "lucide-react";

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
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
}: DropdownProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <Select
        labelId="dropdown-label"
        value={value}
        onChange={handleChange}
        displayEmpty
        sx={{
          fontSize: "0.75rem",
          fontWeight: 500,
          "& .MuiSelect-select": {
            paddingY: "6px",
          },
        }}
        renderValue={
          value
            ? undefined
            : () => (
                <Typography sx={{ fontSize: "0.75rem", opacity: 0.6 }}>
                  {placeholder}
                </Typography>
              )
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  {option.label}
                </Typography>
              </Box>
              {value === option.value && (
                <Check
                  size={16}
                  style={{ color: "#1976d2", marginLeft: "5px" }}
                />
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
