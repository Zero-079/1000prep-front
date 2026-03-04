"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/features/meals/context/cart-context"
import { PlanCard } from "@/features/plans/components/plan-card"
import { PaymentToggle } from "@/features/plans/components/payment-toggle"
import { FAQAccordion } from "@/features/plans/components/faq-accordion"
import { plans } from "@/lib/plans-data"
import { Shield } from "lucide-react"

export default function PlanesPage() {
  const [paymentType, setPaymentType] = useState<"onetime" | "subscription">(
    "onetime"
  )
  const [currentPlan] = useState<string | null>(null)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Elige tu <span className="text-primary">Plan</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Comida saludable preparada con precisión nutricional, entregada
              cuando tú decides
            </p>
          </div>
        </section>

        {/* Payment Toggle */}
        <section className="pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <PaymentToggle value={paymentType} onChange={setPaymentType} />
          </div>
        </section>

        {/* Plans Grid */}
        <section className="pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  paymentType={paymentType}
                  isCurrentPlan={currentPlan === plan.id}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-12 px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-center">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-lg font-medium text-foreground">
                Sin permanencia — cancela cuando quieras
              </p>
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-muted-foreground">
                Resolvemos tus dudas sobre nuestros planes
              </p>
            </div>
            <FAQAccordion />
          </div>
        </section>

        <Footer />
      </div>
    </CartProvider>
  )
}