"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(email: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw new Error(error.message)
  redirect("/dashboard")
}

export async function register(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) throw new Error(error.message)

  // Se confirmação de email está ativa, o usuário não estará logado ainda
  if (data.session) {
    redirect("/dashboard")
  } else {
    redirect("/login?message=Verifique+seu+email+para+confirmar+o+cadastro")
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
