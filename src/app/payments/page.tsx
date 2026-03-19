// src/app/payments/paypal/success/page.tsx
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchAPI } from "@/config/api"
import Link from "next/link"

interface OrderDetail {
  id: string
  status: string
  total: string
  deliveryDate: string
  items: Array<{
    id: string
    quantity: number
    unitPrice: string
    subtotal: string
  }>
  address: {
    label: string
    street: string
    city: string
  } | null
}

function formatCOP(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(num)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")

  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) {
      router.replace("/")
      return
    }

    const fetchOrder = async () => {
      try {
        const data = await fetchAPI<OrderDetail>(`/orders/${orderId}`)
        setOrder(data)
      } catch (err) {
        setError("No se pudo cargar el detalle del pedido.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground text-sm">Verificando tu pago…</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
        <p className="text-destructive font-medium">{error ?? "Orden no encontrada."}</p>
        <Button asChild className="rounded-full">
          <Link href="/">Ir al inicio</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-16 flex flex-col items-center gap-8">
      {/* Success icon */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="size-12 text-primary" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            ¡Pago completado!
          </h1>
          <p className="text-muted-foreground">
            Tu pedido de suplementos fue confirmado y está en camino.
          </p>
        </div>
      </div>

      {/* Order card */}
      <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
          <Package className="size-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Número de orden</p>
            <p className="text-sm font-mono font-semibold text-foreground truncate max-w-[280px]">
              {order.id}
            </p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-full font-semibold">
            Completado
          </span>
        </div>

        {/* Details */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total pagado</span>
            <span className="font-bold text-foreground">{formatCOP(order.total)}</span>
          </div>

          {order.deliveryDate && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fecha de entrega</span>
              <span className="font-medium text-foreground capitalize">
                {formatDate(order.deliveryDate)}
              </span>
            </div>
          )}

          {order.address && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dirección</span>
              <span className="font-medium text-foreground text-right max-w-[60%]">
                {order.address.label
                  ? `${order.address.label} — ${order.address.street}`
                  : order.address.street}
                , {order.address.city}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          asChild
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
        >
          <Link href="/suplementos">
            Seguir comprando
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full flex-1">
          <Link href="/">
            <Home className="size-4 mr-2" />
            Ir al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function PayPalSuccessPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="size-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}