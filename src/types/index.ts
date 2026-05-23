export type TransactionType = "receita" | "despesa"

export type Category =
  | "Alimentação"
  | "Transporte"
  | "Moradia"
  | "Lazer"
  | "Saúde"
  | "Educação"
  | "Salário"
  | "Freelance"
  | "Outros"

export const CATEGORIES: Category[] = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Salário",
  "Freelance",
  "Outros",
]

export const INCOME_CATEGORIES: Category[] = ["Salário", "Freelance", "Outros"]
export const EXPENSE_CATEGORIES: Category[] = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros",
]

export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  category: Category
  created_at: string
}

export interface TransactionFormData {
  description: string
  amount: number
  date: string
  type: TransactionType
  category: Category
}

export interface DashboardSummary {
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export interface CategoryTotal {
  category: Category
  total: number
  color: string
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Alimentação: "#f97316",
  Transporte: "#3b82f6",
  Moradia: "#8b5cf6",
  Lazer: "#ec4899",
  Saúde: "#10b981",
  Educação: "#f59e0b",
  Salário: "#22c55e",
  Freelance: "#06b6d4",
  Outros: "#6b7280",
}
