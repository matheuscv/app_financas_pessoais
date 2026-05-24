import Link from "next/link"
import { TrendingUp, PieChart, Shield, Download, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const features = [
  {
    icon: TrendingUp,
    title: "Dashboard Visual",
    description: "Acompanhe receitas, despesas e saldo em tempo real com cards e gráficos intuitivos.",
  },
  {
    icon: PieChart,
    title: "Categorias",
    description: "Organize suas transações por categoria e entenda onde seu dinheiro está indo.",
  },
  {
    icon: Shield,
    title: "Dados Seguros",
    description: "Autenticação segura com Supabase. Seus dados são privados e protegidos.",
  },
  {
    icon: Download,
    title: "Exportar CSV",
    description: "Exporte suas transações filtradas para análise em planilhas externas.",
  },
]

const benefits = [
  "Registre receitas e despesas em segundos",
  "Visualize gráfico de despesas por categoria",
  "Filtre por mês, categoria e descrição",
  "Acesse de qualquer dispositivo",
  "Exporte relatórios em CSV",
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">FinançasPessoais</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Começar grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          Controle financeiro simples e eficaz
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Suas finanças,{" "}
          <span className="text-blue-600">organizadas</span>
          <br />de forma inteligente
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Registre receitas e despesas, visualize gráficos por categoria e tenha
          uma visão clara do seu saldo mensal. Tudo em um só lugar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/register">
              Começar agora — é grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link href="/login">Já tenho conta</Link>
          </Button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">
          Tudo que você precisa para controlar suas finanças
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Por que usar o FinançasPessoais?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left mb-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-50 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              Criar conta grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} FinançasPessoais. Feito com Next.js e Supabase.</p>
      </footer>
    </div>
  )
}
