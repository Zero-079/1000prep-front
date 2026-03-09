"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/features/meals/context/cart-context"
import { SubscriptionFlow } from "@/features/subscription/components/subscriptionFlow"
import { plans } from "@/lib/plans-data"

function SubscriptionContent() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId") || ""
  const billingType = (searchParams.get("billingType") || "onetime") as
    | "onetime"
    | "subscription"

  // Find the plan details
  const plan = plans.find((p) => p.id === planId)

  if (!plan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto py-16 px-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Plan no encontrado
          </h1>
          <p className="text-muted-foreground">
            Por favor regresa a la página de planes
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  // Calculate the price based on billing type
  const displayPrice =
    billingType === "subscription" && plan.subscriptionDiscount > 0
      ? Math.round(plan.basePrice * (1 - plan.subscriptionDiscount / 100))
      : plan.basePrice

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <section className="pt-32 py-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <a href="/planes" className="hover:text-foreground transition-colors">
              Planes
            </a>
            <span className="mx-2">/</span>
            <span>Suscripción</span>
          </div>

          {/* Flow Container */}
          <SubscriptionFlow
            planId={plan.id}
            planName={plan.name}
            billingType={billingType}
            planPrice={displayPrice}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SuscripcionPage() {
  return (
    <CartProvider>
      <Suspense fallback={<div>Cargando...</div>}>
        <SubscriptionContent />
      </Suspense>
    </CartProvider>
  )
}
