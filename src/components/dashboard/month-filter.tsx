"use client"

import { useRouter, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MONTHS } from "@/lib/format"

interface MonthFilterProps {
  currentMonth: number
  currentYear: number
}

export function MonthFilter({ currentMonth, currentYear }: MonthFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  function navigate(month: number, year: number) {
    router.push(`${pathname}?month=${month}&year=${year}`)
  }

  function prev() {
    if (currentMonth === 1) navigate(12, currentYear - 1)
    else navigate(currentMonth - 1, currentYear)
  }

  function next() {
    if (currentMonth === 12) navigate(1, currentYear + 1)
    else navigate(currentMonth + 1, currentYear)
  }

  return (
    <div className="flex items-center gap-2 bg-background text-foreground border rounded-lg px-3 py-2">
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium min-w-[130px] text-center">
        {MONTHS[currentMonth - 1]} {currentYear}
      </span>
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={next}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
