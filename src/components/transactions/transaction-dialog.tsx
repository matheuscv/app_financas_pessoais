"use client"

import { useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createTransaction, updateTransaction } from "@/lib/actions/transactions"

// Aceita formatos BR (1.000,00) e US (1,000.00) e valores simples (1000)
function parseCurrency(value: string | number): number {
  if (typeof value === "number") return value
  const s = value.trim()
  if (!s) return 0
  const hasDot = s.includes(".")
  const hasComma = s.includes(",")
  if (hasDot && hasComma) {
    // Ex: "1.000,50" → remove pontos, troca vírgula por ponto
    return parseFloat(s.replace(/\./g, "").replace(",", ".")) || 0
  }
  if (hasComma) {
    const afterComma = s.split(",")[1] ?? ""
    // "5,000" → 3 dígitos após vírgula = separador de milhar
    if (afterComma.length === 3) return parseFloat(s.replace(",", "")) || 0
    // "5,50" → decimal BR
    return parseFloat(s.replace(",", ".")) || 0
  }
  if (hasDot) {
    const afterDot = s.split(".")[1] ?? ""
    // "5.000" → 3 dígitos após ponto = separador de milhar
    if (afterDot.length === 3) return parseFloat(s.replace(".", "")) || 0
    // "5.50" → decimal EN
    return parseFloat(s) || 0
  }
  return parseFloat(s) || 0
}
import { CATEGORIES, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/types"
import type { Transaction, TransactionType } from "@/types"

const schema = z.object({
  description: z.string().min(2, "Mínimo 2 caracteres").max(100),
  amount: z.number().positive("Valor deve ser positivo"),
  date: z.string().min(1, "Selecione a data"),
  type: z.enum(["receita", "despesa"]),
  category: z.enum([
    "Alimentação", "Transporte", "Moradia", "Lazer",
    "Saúde", "Educação", "Salário", "Freelance", "Outros",
  ]),
})

type FormData = z.infer<typeof schema>

interface TransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: Transaction | null
}

export function TransactionDialog({
  open,
  onOpenChange,
  transaction,
}: TransactionDialogProps) {
  const [isPending, startTransition] = useTransition()
  const isEditing = !!transaction

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      type: "despesa",
      category: "Outros",
    },
  })

  const watchType = form.watch("type")
  const categories =
    watchType === "receita" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  useEffect(() => {
    if (transaction) {
      form.reset({
        description: transaction.description,
        amount: Number(transaction.amount),
        date: transaction.date,
        type: transaction.type as TransactionType,
        category: transaction.category,
      })
    } else {
      form.reset({
        description: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        type: "despesa",
        category: "Outros",
      })
    }
  }, [transaction, form])

  function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        if (isEditing && transaction) {
          await updateTransaction(transaction.id, data)
          toast.success("Transação atualizada")
        } else {
          await createTransaction(data)
          toast.success("Transação criada")
        }
        onOpenChange(false)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Erro ao salvar")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar transação" : "Nova transação"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Supermercado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        value={field.value || ""}
                        onChange={(e) => {
                          const raw = e.target.value
                          field.onChange(raw)
                        }}
                        onBlur={(e) => {
                          field.onChange(parseCurrency(e.target.value))
                          field.onBlur()
                        }}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
