"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Plan } from "@/lib/plans-data"

interface PlanCardProps {
  plan: Plan
  paymentType: "onetime" | "subscription"
  isCurrentPlan?: boolean
  onSelect?: (planId: string) => void
}

export function PlanCard({
  plan,
  paymentType,
  isCurrentPlan = false,
  onSelect,
}: PlanCardProps) {
  const shouldShowDiscount =
    paymentType === "subscription" && plan.subscriptionDiscount > 0
  const discountedPrice = shouldShowDiscount
    ? Math.round(plan.basePrice * (1 - plan.subscriptionDiscount / 100))
    : plan.basePrice

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="relative bg-card rounded-3xl border border-border shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
            {plan.badge === "popular" ? "Popular" : "Mejor valor"}
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-8 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-muted-foreground">{plan.frequency}</p>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          {shouldShowDiscount ? (
            <>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(plan.basePrice)}
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                  Ahorra {plan.subscriptionDiscount}%
                </span>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {formatPrice(discountedPrice)}
              </div>
            </>
          ) : (
            <div className="text-3xl font-bold text-foreground mb-1">
              {formatPrice(plan.basePrice)}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            por {plan.frequencyLabel}
          </p>
        </div>

        {/* Benefits List */}
        <div className="flex-grow mb-8">
          <ul className="space-y-3">
            {plan.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <Button
          onClick={() => onSelect?.(plan.id)}
          disabled={isCurrentPlan}
          className="w-full rounded-full py-6 font-medium"
          variant={isCurrentPlan ? "outline" : "default"}
        >
          {isCurrentPlan ? "Plan actual" : "Elegir plan"}
        </Button>

        {/* Discount Badge (Bottom) */}
        {shouldShowDiscount && (
          <div className="mt-4 text-center text-xs text-primary font-semibold">
            Ahorra {plan.subscriptionDiscount}% con suscripción
          </div>
        )}
      </div>
    </div>
  )
}