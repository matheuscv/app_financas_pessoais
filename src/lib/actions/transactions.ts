"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { TransactionFormData } from "@/types"

export async function getTransactions(filters?: {
  month?: number
  year?: number
  category?: string
  search?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Não autenticado")

  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })

  if (filters?.month && filters?.year) {
    const start = `${filters.year}-${String(filters.month).padStart(2, "0")}-01`
    const end = new Date(filters.year, filters.month, 0)
      .toISOString()
      .split("T")[0]
    query = query.gte("date", start).lte("date", end)
  }

  if (filters?.category && filters.category !== "all") {
    query = query.eq("category", filters.category)
  }

  if (filters?.search) {
    query = query.ilike("description", `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data
}

export async function createTransaction(formData: TransactionFormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Não autenticado")

  const { error } = await supabase.from("transactions").insert({
    ...formData,
    user_id: user.id,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard")
}

export async function updateTransaction(
  id: string,
  formData: TransactionFormData
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Não autenticado")

  const { error } = await supabase
    .from("transactions")
    .update(formData)
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard")
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Não autenticado")

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard")
}
