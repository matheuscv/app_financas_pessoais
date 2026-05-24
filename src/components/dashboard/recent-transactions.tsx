import Link from "next/link"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/types"
import { formatCurrency, formatDate } from "@/lib/format"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Últimas Transações</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/transacoes">Ver todas</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma transação no período
          </p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full flex-shrink-0 ${
                  t.type === "receita" ? "bg-emerald-50 dark:bg-emerald-950" : "bg-red-50 dark:bg-red-950"
                }`}
              >
                {t.type === "receita" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {t.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(t.date)}</span>
                </div>
              </div>
              <span
                className={`text-sm font-semibold flex-shrink-0 ${
                  t.type === "receita" ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {t.type === "receita" ? "+" : "-"}
                {formatCurrency(Number(t.amount))}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
