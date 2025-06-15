import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { Button as MaterialButton } from '@/themes/material/Button'
import { Button as ShadcnButton } from '@/themes/shadcn/Button'

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button(props: ButtonProps) {
  const { theme } = useTheme()
  
  if (theme === 'material') {
    return <MaterialButton {...props} />
  }
  
  return <ShadcnButton {...props} />;
}