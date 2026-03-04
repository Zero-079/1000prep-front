"use client"

import { cn } from "@/lib/utils"

interface PaymentToggleProps {
  value: "onetime" | "subscription"
  onChange: (value: "onetime" | "subscription") => void
}

export function PaymentToggle({ value, onChange }: PaymentToggleProps) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex items-center bg-muted rounded-full p-1.5 border border-border">
        <button
          onClick={() => onChange("onetime")}
          className={cn(
            "px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-200 text-sm md:text-base",
            value === "onetime"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Pago Único
        </button>
        <button
          onClick={() => onChange("subscription")}
          className={cn(
            "px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-200 text-sm md:text-base",
            value === "subscription"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Suscripción
        </button>
      </div>
    </div>
  )
}