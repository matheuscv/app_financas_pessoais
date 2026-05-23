import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"

interface SummaryCardsProps {
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export function SummaryCards({ totalReceitas, totalDespesas, saldo }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receitas
          </CardTitle>
          <div className="bg-emerald-50 p-2 rounded-lg">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalReceitas)}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-400">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesas
          </CardTitle>
          <div className="bg-red-50 p-2 rounded-lg">
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{formatCurrency(totalDespesas)}</p>
        </CardContent>
      </Card>

      <Card className={`border-l-4 ${saldo >= 0 ? "border-l-blue-500" : "border-l-orange-500"}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
          <div className={`p-2 rounded-lg ${saldo >= 0 ? "bg-blue-50" : "bg-orange-50"}`}>
            <Wallet className={`h-4 w-4 ${saldo >= 0 ? "text-blue-600" : "text-orange-500"}`} />
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${saldo >= 0 ? "text-blue-600" : "text-orange-500"}`}>
            {formatCurrency(saldo)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
