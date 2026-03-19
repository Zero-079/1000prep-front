// src/app/payments/paypal/cancel/page.tsx
"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  XCircle,
  RefreshCw,
  ShoppingBag,
  ArrowLeft,
  RotateCcw,
  CreditCard,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchAPI } from "@/config/api"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface OrderStatus {
  id: string
  status: string
  total: string
  payment: {
    status: string
    paidAt: string | null
  } | null
}

// ── Polling hook ────────────────────────────────────────────────────────────
function useOrderPolling(orderId: string | null) {
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelled, setIsCancelled] = useState(false)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }
  }

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const data = await fetchAPI<OrderStatus>(`/orders/${orderId}`)
        setOrder(data)

        const cancelled =
          data.status === "CANCELLED" || data.status === "EXPIRED"
        if (cancelled) {
          setIsCancelled(true)
          stopPolling()
        }
      } catch {
        // silently ignore
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchOrder()

    // Poll every 5 seconds
    pollingRef.current = setInterval(fetchOrder, 5000)

    return () => stopPolling()
  }, [orderId])

  return { order, isLoading, isCancelled }
}

// ── Content ─────────────────────────────────────────────────────────────────
function CancelContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const token = searchParams.get("token") // PayPal token

  const { order, isLoading, isCancelled } = useOrderPolling(orderId)

  // Determine if a payment was attempted (payment exists but not completed)
  const paymentWasAttempted =
    order?.payment != null && order.payment.status !== "COMPLETED"

  return (
    <div className="max-w-lg mx-auto px-6 py-16 flex flex-col items-center gap-8">

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4 py-10">
          <Loader2 className="size-10 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground text-sm">Verificando estado del pedido…</p>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Icon */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={cn(
                "size-24 rounded-full flex items-center justify-center transition-all duration-500",
                isCancelled
                  ? "bg-destructive/10"
                  : "bg-muted animate-pulse"
              )}
            >
              {isCancelled ? (
                <XCircle className="size-12 text-destructive" />
              ) : (
                <RefreshCw className="size-10 text-muted-foreground animate-spin" />
              )}
            </div>

            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                {isCancelled ? "Pedido cancelado" : "Verificando cancelación…"}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                {isCancelled
                  ? "Tu pedido fue cancelado. No se realizó ningún cobro."
                  : "Estamos confirmando el estado de tu pedido. Esto puede tomar unos segundos."}
              </p>
            </div>
          </div>

          {/* Polling indicator — while waiting for CANCELLED status */}
          {!isCancelled && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-full px-4 py-2">
              <Loader2 className="size-3 animate-spin" />
              Revisando estado cada 5 segundos…
            </div>
          )}

          {/* Confirmed cancelled state */}
          {isCancelled && (
            <>
              {/* Refund notice — shown if a payment was attempted */}
              {paymentWasAttempted && (
                <div className="w-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl px-5 py-4 flex gap-3">
                  <CreditCard className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                      Reembolso automático
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                      Si realizaste algún pago, este será devuelto automáticamente
                      a tu método de pago original en un plazo de{" "}
                      <span className="font-semibold">3 a 5 días hábiles</span>.
                    </p>
                  </div>
                </div>
              )}

              {/* Order info */}
              {orderId && (
                <div className="w-full bg-muted/50 rounded-xl px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Número de orden</p>
                  <p className="text-sm font-mono font-semibold text-foreground break-all">
                    {orderId}
                  </p>
                </div>
              )}

              {/* What happened info */}
              <div className="w-full bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
                <p className="text-sm font-semibold text-foreground">¿Por qué se canceló?</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                    El pago no fue completado en PayPal antes de que expirara el tiempo límite.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                    Cancelaste manualmente el proceso de pago.
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  asChild
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                >
                  <Link href="/suplementos">
                    <RotateCcw className="size-4 mr-2" />
                    Volver a comprar
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full flex-1">
                  <Link href="/pedidos">
                    <ArrowLeft className="size-4 mr-2" />
                    Mis pedidos
                  </Link>
                </Button>
              </div>
            </>
          )}

          {/* If cancelled but no orderId — generic cancel (user cancelled on PayPal directly) */}
          {!orderId && (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                asChild
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
              >
                <Link href="/suplementos">
                  <ShoppingBag className="size-4 mr-2" />
                  Seguir comprando
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full flex-1">
                <Link href="/">Ir al inicio</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function PayPalCancelPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="size-10 text-primary animate-spin" />
          </div>
        }
      >
        <CancelContent />
      </Suspense>
      <Footer />
    </div>
  )
}