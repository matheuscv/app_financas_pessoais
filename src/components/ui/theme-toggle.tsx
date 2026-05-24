"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  variant?: "icon" | "sidebar"
}

export function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  if (variant === "sidebar") {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Alternar tema"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {isDark ? "Modo claro" : "Modo escuro"}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar tema"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
