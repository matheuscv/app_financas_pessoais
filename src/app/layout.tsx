import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinançasPessoais — Controle suas finanças",
  description: "Registre receitas e despesas, visualize gráficos e gerencie suas finanças pessoais.",
}

// Script inline para setar o tema antes da hidratação, evitando flash e o
// warning do React 19 sobre <script> renderizado dentro do ThemeProvider.
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored === 'dark' || stored === 'light' ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch(e) {}
  })()
`.trim()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
