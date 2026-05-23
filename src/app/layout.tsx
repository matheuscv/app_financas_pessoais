import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinançasPessoais — Controle suas finanças",
  description: "Registre receitas e despesas, visualize gráficos e gerencie suas finanças pessoais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className={`${geist.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
