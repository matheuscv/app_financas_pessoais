"use client"

import { useState, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Plus, Search, Download, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MonthFilter } from "@/components/dashboard/month-filter"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionDialog } from "@/components/transactions/transaction-dialog"
import { deleteTransaction } from "@/lib/actions/transactions"
import { CATEGORIES } from "@/types"
import type { Transaction } from "@/types"
import { formatCurrency } from "@/lib/format"

interface TransactionsClientProps {
  transactions: Transaction[]
  currentMonth: number
  currentYear: number
  currentCategory: string
  currentSearch: string
}

export function TransactionsClient({
  transactions,
  currentMonth,
  currentYear,
  currentCategory,
  currentSearch,
}: TransactionsClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [search, setSearch] = useState(currentSearch)

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams()
    params.set("month", String(currentMonth))
    params.set("year", String(currentYear))
    if (currentCategory && currentCategory !== "all") params.set("category", currentCategory)
    if (currentSearch) params.set("search", currentSearch)
    if (value && value !== "all") params.set(key, value)
    else params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    updateParam("search", search)
  }

  function handleCategoryChange(value: string) {
    const params = new URLSearchParams()
    params.set("month", String(currentMonth))
    params.set("year", String(currentYear))
    if (value !== "all") params.set("category", value)
    if (currentSearch) params.set("search", currentSearch)
    router.push(`${pathname}?${params.toString()}`)
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteTransaction(id)
        toast.success("Transação excluída")
      } catch {
        toast.error("Erro ao excluir transação")
      }
    })
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction)
    setDialogOpen(true)
  }

  function exportCSV() {
    const headers = ["Data", "Descrição", "Categoria", "Tipo", "Valor"]
    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type === "receita" ? "Receita" : "Despesa",
      Number(t.amount).toFixed(2).replace(".", ","),
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(";"))
      .join("\n")

    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `transacoes-${currentYear}-${String(currentMonth).padStart(2, "0")}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success("CSV exportado com sucesso")
  }

  const totalReceitas = transactions
    .filter((t) => t.type === "receita")
    .reduce((s, t) => s + Number(t.amount), 0)
  const totalDespesas = transactions
    .filter((t) => t.type === "despesa")
    .reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div className="space-y-4">
      {/* Controles */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <MonthFilter currentMonth={currentMonth} currentYear={currentYear} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditingTransaction(null)
              setDialogOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova transação
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="secondary" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        <Select value={currentCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Resumo rápido */}
      <div className="flex gap-4 text-sm">
        <span className="text-muted-foreground">
          {transactions.length} transaç{transactions.length !== 1 ? "ões" : "ão"}
        </span>
        <span className="text-emerald-600 font-medium">+{formatCurrency(totalReceitas)}</span>
        <span className="text-red-500 font-medium">-{formatCurrency(totalDespesas)}</span>
      </div>

      {/* Tabela */}
      {isPending ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <TransactionTable
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingTransaction(null)
        }}
        transaction={editingTransaction}
      />
    </div>
  )
}
