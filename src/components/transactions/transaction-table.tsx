"use client"

import { useState } from "react"
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Transaction } from "@/types"
import { formatCurrency, formatDate } from "@/lib/format"

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => Promise<void>
}

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await onDelete(deleteId)
    setDeleting(false)
    setDeleteId(null)
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border py-16 text-center">
        <p className="text-muted-foreground text-sm">Nenhuma transação encontrada</p>
        <p className="text-muted-foreground text-xs mt-1">
          Ajuste os filtros ou adicione uma nova transação
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Descrição</TableHead>
              <TableHead className="hidden sm:table-cell">Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="w-20 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1 rounded-full ${
                        t.type === "receita" ? "bg-emerald-50" : "bg-red-50"
                      }`}
                    >
                      {t.type === "receita" ? (
                        <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{t.description}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {t.category} · {formatDate(t.date)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="font-normal">
                    {t.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                  {formatDate(t.date)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={t.type === "receita" ? "default" : "destructive"}
                    className={
                      t.type === "receita"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {t.type === "receita" ? "Receita" : "Despesa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  <span className={t.type === "receita" ? "text-emerald-600" : "text-red-500"}>
                    {t.type === "receita" ? "+" : "-"}
                    {formatCurrency(Number(t.amount))}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onEdit(t)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setDeleteId(t.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir transação</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. A transação será removida permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
