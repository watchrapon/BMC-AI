"use client"

import { Button as ShadcnButton } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Button({ className, variant = "default", size, ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={cn(
        "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200 flex items-center gap-2 font-medium",
        className,
      )}
      variant={variant}
      size={size}
      {...props}
    />
  )
}
