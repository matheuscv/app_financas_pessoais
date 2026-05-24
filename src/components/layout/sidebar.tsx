"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { logout } from "@/lib/actions/auth"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transacoes", label: "Transações", icon: ArrowLeftRight },
]

interface SidebarProps {
  userEmail: string
}

function NavContent({
  userEmail,
  onNavigate,
}: {
  userEmail: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">FinançasPessoais</span>
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {isActive && <ChevronRight className="h-3 w-3 ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t space-y-1">
        <div className="px-3 mb-2">
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
        </div>
        <ThemeToggle variant="sidebar" />
        <form action={logout}>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </form>
      </div>
    </div>
  )
}

export function Sidebar({ userEmail }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b px-4 py-3 flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <NavContent userEmail={userEmail} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 flex-1">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">FinançasPessoais</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Desktop */}
      <aside className="hidden md:flex w-64 bg-background border-r flex-col h-screen sticky top-0">
        <NavContent userEmail={userEmail} />
      </aside>
    </>
  )
}
