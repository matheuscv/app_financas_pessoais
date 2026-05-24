import Link from "next/link"
import { Mail, TrendingUp, MailWarning } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RegisterForm } from "@/components/auth/register-form"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ emailSent?: string }>
}) {
  const params = await searchParams

  if (params.emailSent === "true") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-blue-600 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Verifique seu e-mail</CardTitle>
            <CardDescription>
              Conta criada com sucesso! Enviamos um link de confirmação para o seu e-mail.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
              <MailWarning className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-medium mb-1">Não encontrou o e-mail?</p>
                <p>Verifique também a pasta de <strong>spam</strong> ou <strong>lixo eletrônico</strong> — às vezes o e-mail de confirmação vai parar lá.</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground text-center space-y-1">
              <p>Após confirmar o e-mail, clique no botão abaixo para entrar.</p>
            </div>

            <Button asChild className="w-full">
              <Link href="/login">Ir para o login</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              E-mail errado?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Criar nova conta
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <RegisterForm />
}
