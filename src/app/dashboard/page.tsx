import { getTransactions } from "@/lib/actions/transactions"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { MonthFilter } from "@/components/dashboard/month-filter"

interface PageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams
  const now = new Date()
  const month = params.month ? Number(params.month) : now.getMonth() + 1
  const year = params.year ? Number(params.year) : now.getFullYear()

  const transactions = await getTransactions({ month, year })

  const totalReceitas = transactions
    .filter((t) => t.type === "receita")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalDespesas = transactions
    .filter((t) => t.type === "despesa")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const saldo = totalReceitas - totalDespesas

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral das suas finanças</p>
        </div>
        <MonthFilter currentMonth={month} currentYear={year} />
      </div>

      <SummaryCards
        totalReceitas={totalReceitas}
        totalDespesas={totalDespesas}
        saldo={saldo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart transactions={transactions} />
        <RecentTransactions transactions={transactions.slice(0, 5)} />
      </div>
    </div>
  )
}
