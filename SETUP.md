# FinançasPessoais — Setup

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)

## 1. Configurar o Supabase

1. Crie um projeto novo no Supabase
2. Vá em **SQL Editor** e execute o conteúdo de `supabase-schema.sql`
3. Em **Project Settings → API**, copie:
   - `Project URL`
   - `anon public key`

## 2. Configurar variáveis de ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## 4. Deploy na Vercel

```bash
npm i -g vercel
vercel
```

Adicione as variáveis de ambiente no painel da Vercel ou via CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Página de login
│   ├── register/             # Página de cadastro
│   └── dashboard/
│       ├── page.tsx          # Dashboard com resumo mensal
│       └── transacoes/       # CRUD de transações
├── components/
│   ├── dashboard/            # SummaryCards, CategoryChart, MonthFilter
│   ├── layout/               # Sidebar responsiva
│   └── transactions/         # TransactionDialog, TransactionTable
├── lib/
│   ├── actions/              # Server Actions (auth, transactions)
│   ├── supabase/             # Cliente Supabase (browser + server)
│   └── format.ts             # Formatação de moeda e data
└── types/                    # Tipos TypeScript compartilhados
```
