import { getTransactions } from "@/lib/actions/transactions"
import { TransactionsClient } from "@/components/transactions/transactions-client"

interface PageProps {
  searchParams: Promise<{
    month?: string
    year?: string
    category?: string
    search?: string
  }>
}

export default async function TransacoesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const now = new Date()
  const month = params.month ? Number(params.month) : now.getMonth() + 1
  const year = params.year ? Number(params.year) : now.getFullYear()
  const category = params.category
  const search = params.search

  const transactions = await getTransactions({ month, year, category, search })

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transações</h1>
        <p className="text-sm text-muted-foreground">Gerencie suas receitas e despesas</p>
      </div>
      <TransactionsClient
        transactions={transactions}
        currentMonth={month}
        currentYear={year}
        currentCategory={category ?? "all"}
        currentSearch={search ?? ""}
      />
    </div>
  )
}
