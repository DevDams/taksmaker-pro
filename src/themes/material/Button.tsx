import React from 'react'
import { 
  Button as MUIButton, 
  type ButtonProps as MUIButtonProps 
} from '@mui/material'

export interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', ...props }, ref) => {
    // Mapping des variants custom vers Material UI
    const getMUIVariant = (variant: string) => {
      switch (variant) {
        case 'default':
          return 'contained'
        case 'destructive':
          return 'contained'
        case 'outline':
          return 'outlined'
        case 'secondary':
          return 'contained'
        case 'success':
          return 'contained'
        case 'ghost':
          return 'text'
        case 'link':
          return 'text'
        default:
          return 'contained'
      }
    }

    // Mapping des tailles
    const getMUISize = (size: string) => {
      switch (size) {
        case 'sm':
          return 'small'
        case 'lg':
          return 'large'
        case 'default':
        case 'icon':
          return 'medium'
        default:
          return 'medium'
      }
    }

    // Couleurs spéciales pour certains variants
    const getColor = (variant: string) => {
      switch (variant) {
        case 'destructive':
          return 'error'
        case 'secondary':
          return 'secondary'
        case 'success':
          return 'success'
        default:
          return 'primary'
      }
    }

    return (
      <MUIButton
        ref={ref}
        variant={getMUIVariant(variant)}
        size={getMUISize(size)}
        color={getColor(variant)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button } 